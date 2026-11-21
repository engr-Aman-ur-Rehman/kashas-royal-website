import { useCallback, useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowRight, Check, Loader2, Phone } from "lucide-react";
import { enquiryOptions, routes, venue } from "@/data/venueData";
import { panelSwap } from "@/config/motion";
import { usePrivacy } from "@/context/PrivacyContext";
import Button from "@/components/ui/Button";
import { LogoEmblem } from "@/components/ui/Logo";

/**
 * Enquiry form wired to Netlify Forms.
 *
 * The form name and every field `name` below must match the hidden static
 * form in index.html, which is how Netlify registers the form at build time.
 */
const FORM_NAME = "venue-enquiry";
const MAX_GUESTS = venue.maxGuests;

interface FormValues {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  package: string;
  session: string;
  eventDate: string;
  guests: string;
  addOns: string[];
  message: string;
  consent: boolean;
  botField: string;
}

type FieldName = "name" | "email" | "phone" | "eventDate" | "guests" | "consent";
type Errors = Partial<Record<FieldName, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const emptyValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  eventType: "",
  package: "",
  session: "",
  eventDate: "",
  guests: "",
  addOns: [],
  message: "",
  consent: false,
  botField: "",
};

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");

const todayIso = () => {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
};

const labelFor = (options: readonly { value: string; label: string }[], value: string) =>
  options.find((option) => option.value === value)?.label ?? "";

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

function validate(values: FormValues): Errors {
  const errors: Errors = {};

  if (values.name.trim().length < 2) errors.name = "Please enter your full name.";

  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = "Please enter a valid email address.";

  const digits = values.phone.replace(/\D/g, "");
  if (!values.phone.trim()) errors.phone = "Please enter your phone number.";
  else if (!/^[\d\s()+-]+$/.test(values.phone.trim()) || digits.length < 10 || digits.length > 15)
    errors.phone = "Please enter a valid phone number.";

  if (values.eventDate && values.eventDate < todayIso()) errors.eventDate = "Please choose a date in the future.";

  if (values.guests) {
    const guests = Number(values.guests);
    if (!Number.isInteger(guests) || guests < 1) errors.guests = "Please enter a whole number of guests.";
    else if (guests > MAX_GUESTS) errors.guests = `Our hall hosts up to ${MAX_GUESTS} guests.`;
  }

  if (!values.consent) errors.consent = "Please confirm you are happy for us to contact you.";

  return errors;
}

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: (props: { id: string; "aria-invalid": boolean; "aria-describedby"?: string }) => ReactNode;
}

function Field({ id, label, required, optional, error, hint, className = "", children }: FieldProps) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") || undefined;

  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
        {required ? (
          <span className="text-gold" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
        {optional ? <span className="font-medium normal-case tracking-normal text-slate/70"> (optional)</span> : null}
      </label>
      {children({ id, "aria-invalid": Boolean(error), "aria-describedby": describedBy })}
      {hint && !error ? (
        <p id={hintId} className="mt-2 text-xs text-slate/80">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="mt-2 flex items-center gap-1.5 text-xs font-medium text-[#a4372a]">
          <AlertCircle size={13} strokeWidth={2} aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function EnquiryForm() {
  const baseId = useId();
  const [searchParams] = useSearchParams();
  const { openPrivacy } = usePrivacy();

  const [values, setValues] = useState<FormValues>(() => {
    const requestedPackage = searchParams.get("package") ?? "";
    const requestedType = searchParams.get("type") ?? "";
    return {
      ...emptyValues,
      package: enquiryOptions.packages.some((option) => option.value === requestedPackage) ? requestedPackage : "",
      eventType: enquiryOptions.eventTypes.some((option) => option.value === requestedType) ? requestedType : "",
      addOns: searchParams.get("viewing") ? ["viewing"] : [],
    };
  });
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [submitted, setSubmitted] = useState<FormValues | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  // The confirmation mounts only after the form's exit transition, so focus
  // it when it appears rather than when the status changes.
  const focusOnMount = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    node.focus({ preventScroll: true });
    // The confirmation is much shorter than the form, so bring it back into view.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    (node.closest("[id]") ?? node).scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }, []);

  const errors = validate(values);
  const visibleErrors: Errors = {};
  (Object.keys(errors) as FieldName[]).forEach((field) => {
    if (submitAttempted || touched[field]) visibleErrors[field] = errors[field];
  });
  const errorCount = Object.keys(errors).length;

  const fieldId = (name: string) => `${baseId}-${name}`;
  const set = <K extends keyof FormValues>(key: K, value: FormValues[K]) =>
    setValues((current) => ({ ...current, [key]: value }));
  const touch = (field: FieldName) => setTouched((current) => ({ ...current, [field]: true }));

  const toggleAddOn = (value: string) =>
    setValues((current) => ({
      ...current,
      addOns: current.addOns.includes(value)
        ? current.addOns.filter((item) => item !== value)
        : [...current.addOns, value],
    }));

  useEffect(() => {
    if (status === "error") errorRef.current?.focus();
  }, [status]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitAttempted(true);

    const firstInvalid = (Object.keys(errors) as FieldName[])[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[data-field="${firstInvalid}"]`)?.focus();
      return;
    }

    // Honeypot: real visitors never see or fill this field.
    if (values.botField) {
      setSubmitted(values);
      setStatus("success");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": FORM_NAME,
          "bot-field": values.botField,
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          "event-type": labelFor(enquiryOptions.eventTypes, values.eventType),
          package: labelFor(enquiryOptions.packages, values.package),
          session: labelFor(enquiryOptions.sessions, values.session),
          "event-date": values.eventDate,
          guests: values.guests,
          "add-ons": values.addOns.map((value) => labelFor(enquiryOptions.addOns, value)).join(", "),
          message: values.message.trim(),
          consent: "Yes",
        }),
      });
      if (!response.ok) throw new Error(`Form submission failed with status ${response.status}`);
      setSubmitted(values);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setValues(emptyValues);
    setTouched({});
    setSubmitAttempted(false);
    setSubmitted(null);
    setStatus("idle");
  };

  return (
    <div className="rounded-card border border-hairline bg-stone/50 p-6 sm:p-10 lg:p-12">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" && submitted ? (
          <motion.div
            key="success"
            ref={focusOnMount}
            tabIndex={-1}
            role="status"
            data-testid="enquiry-success"
            variants={panelSwap}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center py-6 text-center outline-none sm:py-10"
          >
            <LogoEmblem className="w-16" />
            <p className="eyebrow mt-9 text-olive">Enquiry Received</p>
            <h2 className="display-lg mt-4">
              Thank you, <em className="text-olive">{submitted.name.trim().split(/\s+/)[0]}</em>
            </h2>
            <p className="lead mt-5 max-w-md">
              Your enquiry is with our team. We will be in touch personally to discuss your occasion and arrange the
              next step.
            </p>

            <dl className="mt-9 w-full max-w-md border-b border-hairline text-left text-sm">
              {[
                ["Event type", labelFor(enquiryOptions.eventTypes, submitted.eventType)],
                ["Preferred package", labelFor(enquiryOptions.packages, submitted.package)],
                ["Preferred date", submitted.eventDate ? formatDate(submitted.eventDate) : ""],
                ["Estimated guests", submitted.guests],
              ]
                .filter(([, value]) => value)
                .map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-6 border-t border-hairline py-3.5">
                    <dt>{label}</dt>
                    <dd className="text-right font-medium text-ink">{value}</dd>
                  </div>
                ))}
            </dl>

            <p className="mt-8 text-sm">
              Planning something soon? Call us on{" "}
              <a href={venue.phone.href} className="font-semibold text-ink underline decoration-gold underline-offset-4">
                {venue.phone.display}
              </a>
              .
            </p>
            <div className="mt-8 flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
              <Button to={routes.home}>Return Home</Button>
              <Button variant="outlineDark" onClick={reset}>
                Send Another Enquiry
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            name={FORM_NAME}
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            noValidate
            onSubmit={handleSubmit}
            aria-labelledby={fieldId("heading")}
            variants={panelSwap}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <input type="hidden" name="form-name" value={FORM_NAME} />
            {/* Honeypot: hidden from people, tempting for bots. */}
            <p className="hidden" aria-hidden="true">
              <label>
                Do not fill this in if you are human:
                <input
                  name="bot-field"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.botField}
                  onChange={(event) => set("botField", event.target.value)}
                />
              </label>
            </p>

            <p className="eyebrow text-olive">Enquiry Form</p>
            <h2 id={fieldId("heading")} className="display-md mt-4">
              Request a bespoke quote
            </h2>
            <p className="mt-3 text-sm">
              Fields marked <span className="text-gold">*</span> are required.
            </p>

            <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
              <Field
                id={fieldId("name")}
                label="Full Name"
                required
                error={visibleErrors.name}
                className="sm:col-span-2"
              >
                {(props) => (
                  <input
                    {...props}
                    data-field="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="field-input"
                    value={values.name}
                    onChange={(event) => set("name", event.target.value)}
                    onBlur={() => touch("name")}
                  />
                )}
              </Field>

              <Field id={fieldId("email")} label="Email Address" required error={visibleErrors.email}>
                {(props) => (
                  <input
                    {...props}
                    data-field="email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    className="field-input"
                    value={values.email}
                    onChange={(event) => set("email", event.target.value)}
                    onBlur={() => touch("email")}
                  />
                )}
              </Field>

              <Field id={fieldId("phone")} label="Phone Number" required error={visibleErrors.phone}>
                {(props) => (
                  <input
                    {...props}
                    data-field="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    className="field-input"
                    value={values.phone}
                    onChange={(event) => set("phone", event.target.value)}
                    onBlur={() => touch("phone")}
                  />
                )}
              </Field>

              <Field id={fieldId("event-type")} label="Event Type">
                {(props) => (
                  <select
                    {...props}
                    name="event-type"
                    className="field-input"
                    value={values.eventType}
                    onChange={(event) => set("eventType", event.target.value)}
                  >
                    <option value="">Please select</option>
                    {enquiryOptions.eventTypes.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
              </Field>

              <Field id={fieldId("package")} label="Preferred Package">
                {(props) => (
                  <select
                    {...props}
                    name="package"
                    className="field-input"
                    value={values.package}
                    onChange={(event) => set("package", event.target.value)}
                  >
                    <option value="">Please select</option>
                    {enquiryOptions.packages.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
              </Field>

              <Field id={fieldId("session")} label="Preferred Session">
                {(props) => (
                  <select
                    {...props}
                    name="session"
                    className="field-input"
                    value={values.session}
                    onChange={(event) => set("session", event.target.value)}
                  >
                    <option value="">Please select</option>
                    {enquiryOptions.sessions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
              </Field>

              <Field id={fieldId("event-date")} label="Preferred Event Date" error={visibleErrors.eventDate}>
                {(props) => (
                  <input
                    {...props}
                    data-field="eventDate"
                    name="event-date"
                    type="date"
                    min={todayIso()}
                    className="field-input"
                    value={values.eventDate}
                    onChange={(event) => set("eventDate", event.target.value)}
                    onBlur={() => touch("eventDate")}
                  />
                )}
              </Field>

              <Field
                id={fieldId("guests")}
                label="Estimated Guest Count"
                error={visibleErrors.guests}
                hint={`Up to ${MAX_GUESTS} guests`}
                className="sm:col-span-2"
              >
                {(props) => (
                  <input
                    {...props}
                    data-field="guests"
                    name="guests"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={MAX_GUESTS}
                    step={1}
                    className="field-input"
                    value={values.guests}
                    onChange={(event) => set("guests", event.target.value)}
                    onBlur={() => touch("guests")}
                  />
                )}
              </Field>

              <fieldset className="sm:col-span-2">
                <legend className="field-label">Optional Add-Ons</legend>
                <div className="mt-1 grid gap-3 sm:grid-cols-2">
                  {enquiryOptions.addOns.map((option) => {
                    const checked = values.addOns.includes(option.value);
                    return (
                      <label
                        key={option.value}
                        className={`flex cursor-pointer items-center gap-3 rounded-[6px] border px-4 py-3.5 text-sm transition-all duration-base ease-editorial focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-gold ${
                          checked
                            ? "border-olive-deep bg-ivory text-ink shadow-[0_10px_24px_-16px_rgb(var(--color-olive-deep)/0.35)]"
                            : "border-olive/25 bg-ivory/40 text-slate hover:-translate-y-0.5 hover:border-olive hover:bg-ivory hover:text-ink"
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="add-ons"
                          value={option.label}
                          checked={checked}
                          onChange={() => toggleAddOn(option.value)}
                          className="peer sr-only"
                        />
                        <span
                          aria-hidden="true"
                          className={`grid h-[1.125rem] w-[1.125rem] shrink-0 place-items-center rounded-[2px] border transition-colors duration-base ease-editorial ${
                            checked ? "border-olive-deep bg-olive-deep text-ivory" : "border-olive/50 bg-ivory"
                          }`}
                        >
                          {checked ? <Check size={12} strokeWidth={3} /> : null}
                        </span>
                        {option.label}
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <Field id={fieldId("message")} label="Tell Us About Your Vision" className="sm:col-span-2">
                {(props) => (
                  <textarea
                    {...props}
                    name="message"
                    rows={4}
                    className="field-input resize-y"
                    placeholder="Your occasion, traditions, colours and anything else we should know"
                    value={values.message}
                    onChange={(event) => set("message", event.target.value)}
                  />
                )}
              </Field>

              <div className="sm:col-span-2">
                <div className="flex items-start gap-3">
                  <span className="relative mt-0.5 grid h-[1.125rem] w-[1.125rem] shrink-0 place-items-center">
                    <input
                      id={fieldId("consent")}
                      data-field="consent"
                      name="consent"
                      type="checkbox"
                      required
                      checked={values.consent}
                      aria-invalid={Boolean(visibleErrors.consent)}
                      aria-describedby={visibleErrors.consent ? `${fieldId("consent")}-error` : undefined}
                      onChange={(event) => {
                        set("consent", event.target.checked);
                        touch("consent");
                      }}
                      className={`peer absolute inset-0 h-full w-full cursor-pointer appearance-none border bg-ivory transition-colors duration-base ease-editorial checked:border-olive checked:bg-olive ${
                        visibleErrors.consent ? "border-[#a4372a]" : "border-olive/50"
                      }`}
                    />
                    <Check
                      size={12}
                      strokeWidth={3}
                      aria-hidden="true"
                      className="pointer-events-none relative text-ivory opacity-0 peer-checked:opacity-100"
                    />
                  </span>
                  <p className="text-sm leading-relaxed">
                    <label htmlFor={fieldId("consent")} className="cursor-pointer">
                      I agree to {venue.name} contacting me about this enquiry and storing the details I have provided.
                      <span className="text-gold" aria-hidden="true">
                        {" "}
                        *
                      </span>
                    </label>{" "}
                    <button
                      type="button"
                      onClick={openPrivacy}
                      className="font-medium text-ink underline decoration-gold underline-offset-4 transition-colors duration-base ease-editorial hover:text-olive"
                    >
                      Read our Privacy Policy
                    </button>
                    .
                  </p>
                </div>
                {visibleErrors.consent ? (
                  <p
                    id={`${fieldId("consent")}-error`}
                    className="mt-2 flex items-center gap-1.5 text-xs font-medium text-[#a4372a]"
                  >
                    <AlertCircle size={13} strokeWidth={2} aria-hidden="true" />
                    {visibleErrors.consent}
                  </p>
                ) : null}
              </div>
            </div>

            <div aria-live="assertive">
              {submitAttempted && errorCount > 0 ? (
                <p
                  data-testid="enquiry-validation-summary"
                  className="mt-8 flex items-start gap-3 border border-[#a4372a]/40 bg-[#a4372a]/5 px-4 py-3.5 text-sm text-[#8a2c21]"
                >
                  <AlertCircle size={16} strokeWidth={1.75} className="mt-0.5 shrink-0" aria-hidden="true" />
                  Please check the {errorCount === 1 ? "highlighted field" : `${errorCount} highlighted fields`} above
                  before sending.
                </p>
              ) : null}
            </div>

            {status === "error" ? (
              <div
                ref={errorRef}
                tabIndex={-1}
                role="alert"
                data-testid="enquiry-error"
                className="mt-8 flex items-start gap-3 border border-[#a4372a]/40 bg-[#a4372a]/5 px-4 py-4 text-sm text-[#8a2c21] outline-none"
              >
                <AlertCircle size={16} strokeWidth={1.75} className="mt-0.5 shrink-0" aria-hidden="true" />
                <p>
                  <strong className="font-semibold">We could not send your enquiry.</strong> Your details are still
                  here, so please try again in a moment, or call us on{" "}
                  <a href={venue.phone.href} className="font-semibold underline underline-offset-4">
                    {venue.phone.display}
                  </a>
                  .
                </p>
              </div>
            ) : null}

            <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <Button
                type="submit"
                size="lg"
                disabled={status === "submitting"}
                icon={
                  status === "submitting" ? (
                    <Loader2 size={16} strokeWidth={1.75} className="animate-spin" />
                  ) : (
                    <ArrowRight size={16} strokeWidth={1.5} />
                  )
                }
              >
                {status === "submitting" ? "Sending" : "Send Enquiry"}
              </Button>
              <p className="flex items-center gap-2.5 text-sm">
                <Phone size={14} strokeWidth={1.5} className="text-gold" aria-hidden="true" />
                Prefer to talk?{" "}
                <a href={venue.phone.href} className="font-semibold text-ink underline decoration-gold underline-offset-4">
                  {venue.phone.display}
                </a>
              </p>
            </div>
            <p className="mt-6 text-xs text-slate/80">
              Looking for answers first? <Link to="#faqs" className="underline underline-offset-4 hover:text-ink">Read our FAQs</Link>.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

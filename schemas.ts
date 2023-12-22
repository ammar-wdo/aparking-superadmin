import * as z from "zod";

const emailSchema = z.string().email();
export const serviceSchema = z
  .object({
    timeToAirport: z.coerce.number().min(1).or(z.undefined()),
    distanceToAirport: z.coerce.number().min(1).or(z.undefined()),
    generalInformation: z.string().optional(),
    importantInfo: z.string().optional(),
    logo: z.string().min(1),
    images: z.array(z.string()).optional(),
    facilities: z.array(z.string()).optional(),
    highlights: z
      .array(
        z.object({
          label: z.string(),
          icon: z.string(),
        })
      )
      .optional(),
    isActive: z.boolean().optional(),
    commession:z.coerce.number().min(0),
    name: z.string().min(1),
    terms: z.string().min(1),
    bookingsEmail: z
      .union([z.string(), z.undefined()])
      .refine((val) => !val || emailSchema.safeParse(val).success),
    parkingAddress: z.string().min(1),
    parkingZipcode: z.string().min(1),
    parkingCountry: z.string().min(1),
    parkingPlace: z.string().min(1),
    spots: z.coerce.number().positive().default(1),
    parkingType: z.enum(["shuttle", "valet"]).default("valet"),
    arrivalTodos: z.string().optional(),
    departureTodos: z.string().optional(),
    electricCharging: z.boolean().default(false),
    keyStatus: z.enum(["LEAVE", "KEEP"]).default("LEAVE"),
    parkingLocation: z.enum(["INDOOR", "OUTDOOR"]).default("INDOOR"),
    available: z.boolean().default(false),

    entityId: z.string().min(1),
  })
  .refine((data) => data.timeToAirport, {
    message: "time to airport is required",
    path: ["timeToAirport"],
  })
  .refine((data) => data.distanceToAirport, {
    message: "distance to airport is required",
    path: ["distanceToAirport"],
  });

export const entitySchema = z.object({
  companyId: z.string().min(1),
  airportId: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  entityName: z.string().min(1),
  entityAddress: z.string().min(1),
  entityZipcode: z.string().min(1),
  entityPlace: z.string().min(1),
  phone: z.string().refine((value) => {
    const phoneRegex = /^(?:[0-9]){1,3}(?:[ -]*[0-9]){6,14}$/;
    return phoneRegex.test(value);
  }, "Invalid phone number"),
  invoiceAddress: z.string().min(1),
  contactPerson: z.string().min(1),
  companyName: z.string().min(1),
  invoiceEmail: z.string().email(),
  invoiceZipcode: z.string().min(1),
  invoicePlace: z.string().min(1),
  invoiceCountry: z.string().min(1),
  vatNO: z.string().optional(),
  IBAN: z.string().optional(),
  chamberOfCommerce: z.string().min(1),
  isActive: z.boolean().default(false),
  images: z.array(z.string()).default([]),
  content: z.string().default(""),
});

export const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  isActive: z.boolean(),
  address: z.string().min(2).max(50),
  password: z.string().min(6),
  contact: z.string().min(2).max(50),
  chamberOfCommerce: z.string().min(1),
  vatNO: z.string().min(1),

  phone: z.string().refine((value) => {
    const phoneRegex = /^(?:[0-9]){1,3}(?:[ -]*[0-9]){6,14}$/;
    return phoneRegex.test(value);
  }, "Invalid phone number"),
  place: z.string().min(2).max(50),
  zipcode: z.string().min(1),
});

export const blogSchema = z.object({
  title: z.string().min(2),
  content: z.string().min(3),
  slug: z.string().min(3),
  author: z.string().min(1),
  shortDescription: z.string().min(4),
  tags: z.array(z.string()),
  featuredImage: z.string().min(1),
  categoryId: z.string().min(1),
});

export const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

import * as z from "zod";

const emailSchema = z.string().email({message:'E-mail is required'});

export const serviceSchema = z
  .object({
    timeToAirport: z.coerce.number().min(1).or(z.undefined()),
    distanceToAirport: z.coerce.number().min(1).or(z.undefined()),
    generalInformation: z.string().optional(),
    importantInfo: z.string().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
 
    images: z.array(z.string()).min(1, 'At least one image is required'),
    facilities: z.array(z.string()).optional(),
    slug:z.string().min(1).refine((value) => !/\s/.test(value), 
     'Slug should not contain spaces',
    ),
    highlights: z
      .array(
        z.object({
          label: z.string(),
          icon: z.string(),
        })
      )
      .optional(),
    isActive: z.boolean().optional(),
    commession:z.coerce.number().min(0).nonnegative({message:'Negative values are not acceptable'}),
    name: z.string().min(1,{message:'Name is required'}),
    terms: z.string().min(1,{message:'Link to terms is reuired'}),
    bookingsEmail: z
      .union([z.string(), z.undefined()])
      .refine((val) => !val || emailSchema.safeParse(val).success),
    parkingAddress: z.string().min(1,{message:'Parking address is required'}),
    parkingZipcode: z.string().min(1,{message:'Parking zipcode is required'}),
    parkingCountry: z.string().min(1,{message:'Country is required'}),
    parkingPlace: z.string().min(1,{message:'Parking place is required'}),
    spots: z.coerce.number().positive({message:"Negative values are not allowed"}).default(1),
    parkingType: z.enum(["shuttle", "valet"]).default("valet"),
    arrivalTodos: z.string().optional(),
    departureTodos: z.string().optional(),
    electricCharging: z.boolean().default(false),
    keyStatus: z.enum(["LEAVE", "KEEP"]).default("LEAVE"),
    parkingLocation: z.enum(["INDOOR", "OUTDOOR"]).default("INDOOR"),
    available: z.boolean().default(false),

    entityId: z.string().min(1),
    isParkingproService:z.boolean(),
    parkingproId:z.string().optional().or(z.literal(undefined)),
    parkingproCompanyId:z.string().optional().or(z.literal(undefined))
  })
  .refine((data) => data.timeToAirport, {
    message: "time to airport is required",
    path: ["timeToAirport"],
  })
  .refine((data) => data.distanceToAirport, {
    message: "distance to airport is required",
    path: ["distanceToAirport"],
  }).refine(data=>!data.isParkingproService || !!(data.parkingproId && data.parkingproCompanyId),{message:"Parkingpro Id or Parkingpr Company Id is missing",path:['parkingproId']})
  
  ;

  const newPassword = z.string().min(6,{message:"Enter at least 6 chars"});

export const entitySchema = z.object({
  companyId: z.string().min(1),
  airportId: z.string().min(1),
  email: z.string().email({message:"E-mail is required"}),
  password: z.string().min(6,{message:"Enter at least 6 chars"}),
  newPassword:  z.union([z.string(), z.undefined()])
  .refine((val) => !val || newPassword.safeParse(val).success),
  entityName: z.string().min(1,{message:'Entity name is required'}),
  slug:z.string().min(1,{message:"Slug is required"}).refine((value) => !/\s/.test(value), 
   'Slug should not contain spaces',
   
  ),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  entityAddress: z.string().min(1,{message:'Entity address is required'}),
  entityZipcode: z.string().min(1,{message:'Entity zipcode is required'}),
  entityPlace: z.string().min(1,{message:'Entity place is required'}),
  phone: z.string().refine((value) => {
    const phoneRegex = /^(?:[0-9]){1,3}(?:[ -]*[0-9]){6,14}$/;
    return phoneRegex.test(value);
  }, "Invalid phone number"),
  invoiceAddress: z.string().min(1,{message:'Invoice address is required'}),
  contactPerson: z.string().min(1,{message:'Contact person is required'}),
  companyName: z.string().min(1,{message:'Company name is required'}),
  invoiceEmail: z.string().email({message:"Invoice e-mail is required"}),
  invoiceZipcode: z.string().min(1,{message:'Invoice zipcode is required'}),
  invoicePlace: z.string().min(1,{message:'Invoice place is required'}),
  invoiceCountry: z.string().min(1,{message:'Invoice country is required'}),
  vatNO: z.string().min(1,{message:'Vat NO is required'}),
  IBAN: z.string().optional(),
  chamberOfCommerce: z.string().min(1,{message:'Chamber of commerce is required'}),
  isActive: z.boolean().default(false),
 images: z.array(z.string()).min(1, 'At least one image is required'),
  logo: z.string().min(1,{message:"Upload an image please"}),
  content: z.string().default(""),
});

export const registerSchema = z.object({
  email: z.string().email({message:'E-mail is required'}),
  name: z.string().min(1,{message:'Company name is required'}),
  isActive: z.boolean(),
  address: z.string().min(2,{message:'Address is required'}).max(50),
  password: z.string().min(6,{message:'Required at least 6 chars'}),
  newPassword:  z.union([z.string(), z.undefined()])
  .refine((val) => !val || newPassword.safeParse(val).success),
  contact: z.string().min(2,{message:'Contact is required'}).max(50),
  chamberOfCommerce: z.string().min(1,{message:'Chamber of commerce is required'}),
  vatNO: z.string().min(1,{message:'Vat NO is required'}),
  slug:z.string().min(1,{message:'Slug is required'}).refine((value) => !/\s/.test(value), 
  'Slug should not contain spaces',
  ),

  phone: z.string().refine((value) => {
    const phoneRegex = /^(?:[0-9]){1,3}(?:[ -]*[0-9]){6,14}$/;
    return phoneRegex.test(value);
  }, "Invalid phone number"),
  place: z.string().min(2,{message:'Place is required'}).max(50),
  zipcode: z.string().min(1,{message:'Zipcode is required'}),
});

export const blogSchema = z.object({
  title: z.string().min(2,{message:'Title is required'}),
  content: z.string().min(3,{message:'Content is required'}),
  slug: z.string().min(3,{message:'Slug is required'}),
  author: z.string().min(1,{message:'Author is required'}),
  shortDescription: z.string().min(4,{message:'Description is required'}),
  tags: z.array(z.string()),
  featuredImage: z.string().min(1,{message:'Upload an image please '}),
  categoryId: z.string().min(1),
});

export const faqSchema = z.object({
  question: z.string().min(1,{message:'Question field is required'}),
  answer: z.string().min(1,{message:'Answer field is required'}),
  categoryFaqId:z.string().min(1,{message:'Category is required'})
});



export const airportSchema = z.object({
  name: z.string().min(2,{message:'Name is required'}).max(50),
  images: z.array(z.string()).min(1, 'At least one image is required'),
  blockOneImage:z.string().min(1,'required field'),
  blockTwoImage:z.string().min(1,'required field'),
  content:z.string().default(''),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  blockOneContent:z.string().min(1,'required field'),
  blockOneImageAlt:z.string().min(1,'required field'),
  blockTwoImageAlt:z.string().min(1,'required field'),
  blockTwoContent:z.string().min(1,'required field'),
  faq:z.array(z.object({question:z.string().min(1),answer:z.string().min(1)})).min(1,'At least 1 FAQ'),
  slug:z.string().min(1,{message:'Slug is required'}).refine((value) => !/\s/.test(value), 
  'Slug should not contain spaces',
  ),
})




export const discountSchema = z.object({
  label:z.string().min(1,'label is required'),
  code:z.string().min(1,'code is mandatory'),
  type:z.enum(['PERCENTAGE','FIXED']).optional(),
  based:z.enum(['BOOKING','CREATING']).optional(),
  startDate:z.date(),
  endDate:z.date(),
  percentage: z.coerce.number().max(90).optional(),
  value: z.coerce.number().optional(),
})
.refine((data) => data.type !== "FIXED" ||  !!data.value, {
  message: "Value is required",
  path: ["value"],
})
.refine((data) => data.type !== "PERCENTAGE" || !!data.percentage, {
  message: "percentage is required",
  path: ["percentage"],
}).refine(
  (date) =>
    new Date(date.startDate).getTime() <= new Date(date.endDate).getTime(),
  { message: "Invalid blocking range", path: ["startDate"] }
);

export const reviewStatusArray = ['PENDING','ACTIVE']
export const reviewVisibilityArray = ['FIRSTNAME',
'FULLNAME',
'ANOUNYMOS']

const reviewStatus = ['PENDING','ACTIVE'] as const
const reviewVisibility = ['FIRSTNAME',
  'FULLNAME',
  'ANOUNYMOS'] as const

export const reviewSchema = z.object({
  entityId:z.string().min(1),
  serviceId:z.string().min(1),
  reviewContent:z.string().optional().or(z.literal(undefined)),
  rate:z.string().refine(value=>+value <=5),
  status:z.enum(reviewStatus).refine(val=>reviewStatus.includes(val),{message:'Invalid Value',path:['rate']}),
  visibility:z.enum(reviewVisibility).refine(val=>reviewVisibility.includes(val),{message:"Invalid Value",path:['visibility']}),
  firstName:z.string().optional(),
  lastName:z.string().optional(),
  email:emailSchema,
  placeHolderDate:z.date()




}).refine(val=>val.visibility === 'ANOUNYMOS' || !!val.firstName,{message:'Required Field',path:['firstName']})
.refine(val=>val.visibility !=='FULLNAME' || !!val.lastName,{message:'Required Field',path:['lastName']})



export  const aboutSchema = z.object({
  content: z.string().min(2, {
   
  }),
  blockTwoImageAlt:z.string().min(1,'required field'),
  blockTwoImage:z.string().min(1,'required field'),
  blockOneContent:z.string().min(1,'required field'),
  blockTwoContent:z.string().min(1,'required field'),
  faq:z.array(z.object({question:z.string().min(1),answer:z.string().min(1)})).min(1,'At least 1 FAQ'),
})

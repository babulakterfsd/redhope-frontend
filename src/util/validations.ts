import z from 'zod';

// signup schema for validation
export const signupSchema = z.object({
  name: z
    .string({
      invalid_type_error: ' must be string',
      required_error: ' is required',
    })
    .trim()
    .min(3, 'Min 3 character')
    .max(30, 'Max 30 character'),
  username: z
    .string({
      invalid_type_error: ' must be string',
      required_error: ' is required',
    })
    .trim()
    .min(3, 'Min 3 character')
    .max(20, 'Max 20 character'),
  email: z
    .string({
      invalid_type_error: ' must be string',
      required_error: ' is required',
    })
    .trim()
    .email('Please enter a valid email address'),
  password: z
    .string({
      invalid_type_error: ' must be string',
      required_error: ' is required',
    })
    .trim()
    .min(6, 'Min 6 character strong password with at least one number'),
  isAvailableToDonate: z.boolean({
    invalid_type_error: ' must be boolean',
    required_error: ' is required',
  }),
  bloodGroup: z.enum(
    [
      'A-positive',
      'A-negative',
      'B-positive',
      'B-negative',
      'AB-positive',
      'AB-negative',
      'O-positive',
      'O-negative',
    ],
    {
      invalid_type_error: ' must be a valid blood group',
      required_error: ' is required',
    }
  ),
});

// login schema for validation
export const loginSchema = z.object({
  email: z.string().trim().email('Please provide a valid email address'),
  password: z
    .string()
    .trim()
    .min(6, 'Password must be at least 6 characters long'),
});

// change user status / role schema for validation
export const changeUserStatusSchema = z.object({
  email: z.string({
    invalid_type_error: ' must be string',
    required_error: ' is required',
  }),
  activeStatus: z
    .boolean({
      invalid_type_error: ' must be boolean',
      required_error: ' is required',
    })
    .optional(),
  role: z
    .enum(['admin', 'donor'], {
      invalid_type_error: 'User must be either admin or donor',
      required_error: ' is required',
    })
    .optional(),
});

// change password schema for validation
export const changePasswordSchema = z.object({
  currentPassword: z.string({
    invalid_type_error: ' must be string',
    required_error: ' is required',
  }),
  newPassword: z.string({
    invalid_type_error: ' must be string',
    required_error: ' is required',
  }),
});

// update profile schema for validation
export const updateProfileSchema = z.object({
  name: z
    .string({
      invalid_type_error: ' must be string',
      required_error: ' is required',
    })
    .optional(),
  username: z
    .string({
      invalid_type_error: ' must be string',
      required_error: ' is required',
    })
    .optional(),
  email: z
    .string({
      invalid_type_error: ' must be string',
      required_error: ' is required',
    })
    .optional(),
  profileImage: z
    .string({
      invalid_type_error: ' must be string',
      required_error: ' is required',
    })
    .optional(),
  isAccountActive: z
    .boolean({
      invalid_type_error: ' must be boolean',
      required_error: ' is required',
    })
    .optional(),
  isAvailableToDonate: z
    .boolean({
      invalid_type_error: ' must be true or false',
      required_error: ' is required',
    })
    .optional(),

  location: z
    .object({
      address: z
        .string({
          invalid_type_error: ' must be string',
        })
        .optional(),
      city: z
        .string({
          invalid_type_error: ' must be string',
        })
        .optional(),
      state: z
        .string({
          invalid_type_error: ' must be string',
        })
        .optional(),
      country: z
        .string({
          invalid_type_error: ' must be string',
        })
        .optional(),
      postalCode: z
        .string({
          invalid_type_error: ' must be string',
        })
        .optional(),
      mobile: z
        .string({
          invalid_type_error: ' must be string',
        })
        .optional(),
    })
    .optional(),
});

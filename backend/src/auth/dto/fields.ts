import { z } from 'zod';

export const emailField = z.string().trim().toLowerCase().pipe(z.email({ message: 'Invalid email address' }));
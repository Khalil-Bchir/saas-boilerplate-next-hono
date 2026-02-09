import { PrismaClient } from '@repo/database';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@repo/types';

export type AbstractServiceOptions = {
  prisma: PrismaClient;
};

export type AuthenticationServiceOptions = AbstractServiceOptions & {
  supabase: SupabaseClient<Database>;
  emailRedirectTo?: string;
  resetRedirectTo?: string;
  oauthRedirectTo?: string;
};

export type CarsServiceOptions = AbstractServiceOptions & {
  storageClient: SupabaseClient<Database>;
  storageBucket: string;
  signedUrlTTL?: number;
};

export type CarRequestsServiceOptions = AbstractServiceOptions;
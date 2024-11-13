// pages/api/check-warden.ts

import { NextApiRequest, NextApiResponse } from 'next';
import db from '@/lib/prismadb';  // Your Prisma client instance
import { auth } from '@clerk/nextjs/server'; // Clerk's server-side auth

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get userId from Clerk's auth context
    const { userId } = await auth();

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Query the database to check if the user is a warden
    const warden = await db.warden.findUnique({
      where: { userId },
    });

    if (!warden) {
      return res.status(403).json({ error: 'Not a warden' });
    }

    // If the user is a warden, return success
    return res.status(200).json({ isWarden: true });
  } catch (error) {
    console.error('Error checking warden status:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

import { getMessages } from 'next-intl/server'

// Existing presentational components can keep their dictionary props during migration.
export const getDictionary = locale => getMessages({ locale })

import 'server-only'
import config from '@payload-config'
import { getPayload } from 'payload'
export const getCMS = () => getPayload({ config })

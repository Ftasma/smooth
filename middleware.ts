import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { useCookies } from 'react-cookie';
import {cookies} from "next/headers";
const isAuth= false
export function middleware(request: NextRequest) {
  const token = cookies().get("token")?.value
  console.log(token);
  
  
  if(!token){
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }
    // return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard', '/create-election', '/election-management-dashboard','/our-pricing','/our-pricing/calculate-price','/make-payment','/send-funds','/wallet','/create-election-2','/voters-acquisition','/accreditation-form','/election-management-dashboard/candidates','/election-management-dashboard/payment','/election-management-dashboard/voters'],
}
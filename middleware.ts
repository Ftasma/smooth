import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const isAuth= false
export function middleware(request: NextRequest) {
    
    if(!isAuth){
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/sign-up',
}
import { HttpRequest, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const noopInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const cookie = inject(CookieService);
  const token = cookie.get('XAuthorization')?.trim() || localStorage.getItem('XAuthorization');
  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
      withCredentials: true
    });
    return next(authReq);
  }
  return next(req);
};

// TODO: Figure how to have the router from the angular context to redirect
// return next(modifiedRequest).pipe(
//   catchError((error: any) => {
//     if (error instanceof HttpErrorResponse && error.status === 401) {
//       // Redirect to login page
         // "@angular/router"
//       Router.navigate(['/login']);
//     }
//     return throwError(error);
//   })
// );

// TODO: Possivelmente utilizar isto, mas improvável que funcione já que não
//  parece que seria o mesmo router do contexto do angular, mas ainda validar
// export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => {
//   // Create an instance of the AuthInterceptor
//   const interceptor = new AuthInterceptor(new Router());

//   // Use the intercept method of AuthInterceptor
//   return interceptor.intercept(req, next);
// };

// class AuthInterceptor implements HttpInterceptor {

//   constructor(private router: Router) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     // Clone the request and set "withCredentials" to true
//     const modifiedRequest = req.clone({ withCredentials: true });

//     // Pass the modified request to the next handler
//     return next.handle(modifiedRequest).pipe(
//       catchError((error: any) => {
//         if (error instanceof HttpErrorResponse && error.status === 401) {
//           // Redirect to login page
//           this.router.navigate(['/login']);
//         }
//         return throwError(error);
//       })
//     );
//   }
// }

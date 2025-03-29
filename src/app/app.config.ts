import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { Mensagem } from './components/utils/mensagem';
import { SessaoService } from './components/service/sessao/sessao.service';
import { LogadoOnGuard } from './components/account/shared/logadoOn';
import { noopInterceptor } from './auth-interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([noopInterceptor])
    ),
    provideHttpClient(withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    SessaoService,
    LogadoOnGuard,
    Mensagem,
    /*{
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              'clientId'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('clientId')
          },
          { provide: HTTP_INTERCEPTORS, useClass: InterceptService, multi: true },
          { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }, provideAnimationsAsync()*/
  ]
};



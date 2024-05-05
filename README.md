## Ahaviet FrontEnd

Frontend module for ahaviet website

# Config

Currently I configuration flow this official instruction:

</br>

[https://nextjs.org/docs/basic-features/environment-variables](https://nextjs.org/docs/basic-features/environment-variables)

</br>

Depend on environments you want. Please add suitable variables for corresponding configuration. Our application are going to support development and production environments

</br>

.env.production

```
NEXT_PUBLIC_SITENAME=Ahaviet
NEXT_PUBLIC_URL=https://ahaviet.com
NEXT_PUBLIC_API_URL=https://ahaviet.com/api


NEXT_PUBLIC_FB_APP_ID=<your facebook app id>
NEXT_PUBLIC_GOOGLE_APP_ID=<your google app id>
NEXT_PUBLIC_GOOGLE_MAP_KEY=<your public google map key>
```

# Usage conmmand

- Start server in development mode (support hot reload)

```
npm run dev
```

- Build

```
npm run build
```

- Start server in production mode

```
npm run start
```

- Check lint

```
npm run check-lint
```

- Start proxy in case of needing to test login facebook, google in development mode (It's require https protocol)

```
npm run proxy
```

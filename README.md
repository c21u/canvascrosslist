# Canvas Crosslist LTI

Built using [React Starter Kit](https://github.com/kriasoft/react-starter-kit/blob/master/docs/getting-started.md)

Dev setup:

Create a `.env` file containing

    LTI_KEY=key
    LTI_SECRET=secret
    CANVAS_TOKEN=canvas-admin-token

- Install [mkcert](https://github.com/FiloSottile/mkcert)
- Run `mkcert -install` to install a local CA
- Generate SSL certs with `mkcert -cert-file ~/certs/127.0.0.1.nip.io.crt -key-file ~/certs/127.0.0.1.nip.io.key '\*.127.0.0.1.nip.io'
- Run `docker-compose up`
- In your Canvas-Test instance navigate to `Admin` -> account -> `Settings` -> `Apps` -> `View App Configurations` -> `+App`
- Select `Paste XML` as `Configuration Type`, set the key and secret to match your `.env` file, and paste the contents of `install.example.xml` into the `XML Configuration` and click `Submit`
- You can now find the tool under `Account` -> `Settings` -> `Crosslist`

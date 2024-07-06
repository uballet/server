import express, { Request, Response , Application } from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import { AppDataSource } from "./data-source"
import PasskeyService from './services/passkey';
import SignUpService from './services/sign-up';

// For env File 
dotenv.config();

const checkNodeVersion = (version: number) => {
  const versionRegex = new RegExp(`^${version}\\..*`);
  const versionCorrect = process.versions.node.match(versionRegex);
  if (!versionCorrect) {
    throw Error(
      `Running on wrong Nodejs version. Please upgrade the node runtime to version ${version}`
    );
  }
};

checkNodeVersion(20)

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json()); // <--- Here

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.get('/.well-known/assetlinks.json', (req: Request, res: Response) => {
  res.send()
})

app.get('/.well-known/apple-app-site-association', (req: Request, res: Response) => {
    const json = {
        "applinks": {},
        "webcredentials": {
          "apps": ["J3QNL6QPT5.com.flperez.uballet"]
        },
        "appclips": {}
      }
    res.status(200).json(json)
})

app.get('/passkey-registration-options', async (req: Request, res: Response) => {
    const { userId } = req.query
    const options = await PasskeyService.getRegistrationOptions(userId as string)
    return res.status(200).json(options)
})

app.get('/passkey-authentication-options', async (req: Request, res: Response) => {
    const options = await PasskeyService.getAuthenticationOptions()
    return res.status(200).json(options)
})

app.get('/passkeys', async (req: Request, res: Response) => {
    console.log({ userId: req.params })
    const credentials = await PasskeyService.getUserCredentials(req.query.userId as string)
    console.log({ credentials })
    return res.status(200).json(credentials)
})

app.post('/verify-passkey-authentication', async (req: Request, res: Response) => {
  const { credentials, challenge } = req.body

  const { user, verified } = await PasskeyService.verifyAuthentication(credentials, challenge)

  if (!verified) {
    return res.status(401).send()
  }

  return res.status(200).json(user)
})

app.post('/verify-passkey-registration', async (req: Request, res: Response) => {
    const { credentials, challenge, userId } = req.body
    const { verified, passkey } = await PasskeyService.verifyRegistration(userId, credentials, challenge)

    if (!verified) {
        return res.status(401).send()
    }
    return res.status(200).json(passkey)
})

app.post('/signup', async (req: Request, res: Response) => {
    const { email } = req.body
    const { user } = await SignUpService.signup(email)
    return res.status(200).json(user)
})

app.post('/verify-email', async (req: Request, res: Response) => {
  const { email, code } = req.body
  const verified = await SignUpService.verifyUserEmail(email, code)

  return res.status(200).send()
})

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

AppDataSource.initialize().then(async () => {
    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))

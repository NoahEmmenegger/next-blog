import { useAuth } from '../utils/auth';
import { useRouter } from 'next/router';
import Auth from '../components/Auth'

export default function Home() {
  const auth = useAuth();
  const router = useRouter();

  const signIn = ({ email, pass }) => {
    auth.signin(email, pass)
      .then(() => {
        router.push('/dashboard');
      })
      .catch((error) => {
        console.log('An error occurred.')
      });
  };

  return <Auth onclick={signIn} />;
}
import cn from 'classnames';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { postData } from '../utils/helpers';
import { getStripe } from '../utils/initStripejs';
import { useUser } from '../components/UserContext';
import Button from './ui/Button';

export default function Applications({ apps }) {
  const [billingInterval, setBillingInterval] = useState('month');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { session, userLoaded, subscription } = useUser();

  if (!apps.length)
    return (
      <section className="bg-black">
        <div className="max-w-6xl mx-auto py-8 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center"></div>
          <p className="text-6xl font-extrabold text-white sm:text-center sm:text-6xl">
            No subscription pricing plans found. Create them in your{' '}
            <a
              className="text-pink underline"
              href="https://dashboard.stripe.com/products"
              rel="noopener noreferrer"
              target="_blank"
            >
              Stripe Dashboard
            </a>
            .
          </p>
        </div>
      </section>
    );

  return (
    <section className="bg-black">
      <div className="max-w-6xl mx-auto py-8 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            Applications
          </h1>
          <p className="mt-5 text-xl text-accents-6 sm:text-center sm:text-2xl max-w-2xl m-auto">
            Create an app to work with serverless websockets.
          </p>
        </div>
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-4">
          {apps.map((app) => {
            return (
              <div
                key={app.id}
                className={cn(
                  'rounded-lg shadow-sm divide-y divide-accents-2 bg-primary-2',
                  {
                    'border border-pink': subscription
                      ? app.name === subscription?.prices?.products.name
                      : app.name === 'Freelancer'
                  }
                )}
              >
                <div className="p-6">
                  <h2 className="text-2xl leading-6 font-semibold text-white">
                    {app.name}
                  </h2>
                  <p className="mt-4 text-accents-5">{app.description}</p>
                  <Button
                    variant="slim"
                    type="button"
                    disabled={session && !userLoaded}
                    loading={loading}
                    onClick={() => console.log('go to app detail view')}
                    className="mt-8 block w-full rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
                  >
                    Manage
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}



import SubscriptionForm from "@/components/admin/Subscription/SubscriptionForm";
import Container from "@/components/common/Container/Container";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import StripeProvider from "@/utils/admin/stripeProvider";


export default function Subscription() {
  return (
    <Container>
      <PageHeader
        headText="Subscription"
        linkName="Subscription list"
        link="/admin/subscription-list"
      />
      <div className="flex items-center justify-center rounded-md bg-white/50 px-2 py-3 shadow-sm shadow-primary backdrop-blur">
        <StripeProvider>
          <SubscriptionForm />
        </StripeProvider>
      </div>
    </Container>
  );
}

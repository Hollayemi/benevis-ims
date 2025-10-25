

import ProfileUpdateForm from "@/components/admin/Profile/ProfileUpdateForm";
import Container from "@/components/common/Container/Container";
import PageHeader from "@/components/common/PageHeader/PageHeader";

const Profile = () => {
  return (
    <Container>
      <PageHeader headText="profile" />

      <div className="flex h-full min-h-[75vh] w-full items-center justify-center rounded-md bg-white/50 p-4 px-2 py-5 shadow-sm shadow-primary backdrop-blur">
        <div className="w-full max-w-4xl space-y-5">
          {/* update form */}
          <ProfileUpdateForm />
        </div>
      </div>
    </Container>
  );
};

export default Profile;

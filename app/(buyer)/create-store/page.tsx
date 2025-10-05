import CreateStoreForm from "./form";

export default function CreateStore() {
  return (
    <main className="px-6 max-w-7xl mx-auto my-10 space-y-5">
      <div className="max-w-lg">
        <h1 className="text-2xl text-slate-500">
          Add Your <span className="text-slate-800">Store</span>
        </h1>
        <p className="text-slate-500">
          To become a seller on GoCart, submit your store details for review.
          Your store will be activated after admin verification.
        </p>

        <CreateStoreForm />
      </div>
    </main>
  );
}

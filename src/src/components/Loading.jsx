export default function Loading({ isLoading }) {
  return (
    <div className={isLoading ? `fixed top-0 right-0 left-0 bottom-0 bg-slate-50 flex items-center justify-center z-[9999]` : 'hidden'}>
      <img className="w-32 md:w-48" src="./gif/loading.gif" alt="loading" />
    </div>
  );
}
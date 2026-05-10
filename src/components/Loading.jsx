export default function Loading() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-[#151728] font-dmsans">
            <div className="w-12 h-12 border-4 border-primary2 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-primary2 text-lg font-bold tracking-widest animate-pulse">LOADING...</p>
        </div>
    );
}
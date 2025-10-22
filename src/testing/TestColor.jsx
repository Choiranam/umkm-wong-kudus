const TestColor = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-10 bg-light">
            <h1 className="text-3xl font-bold text-dark">Test Warna Tailwind Custom</h1>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
                <div className="w-32 h-32 bg-dark text-light flex items-center justify-center rounded-lg shadow">
                    dark
                </div>
                <div className="w-32 h-32 bg-green text-light flex items-center justify-center rounded-lg shadow">
                    green
                </div>
                <div className="w-32 h-32 bg-orange text-light flex items-center justify-center rounded-lg shadow">
                    orange
                </div>
                <div className="w-32 h-32 bg-yellow text-dark flex items-center justify-center rounded-lg shadow">
                    yellow
                </div>
                <div className="w-32 h-32 bg-light text-dark flex items-center justify-center rounded-lg shadow border">
                    light
                </div>
            </div>
        </div>
    );
};

export default TestColor;

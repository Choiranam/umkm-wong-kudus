import React from "react";

const KecamatanCard = () => {
  const kecamatanData = [
    { name: "Bae", placeCount: 27 },
    { name: "Kaliwungu", placeCount: 19 },
    { name: "Gebog", placeCount: 5 },
    { name: "Undaan", placeCount: 7 },
  ];

  return (
    <div className="p-6 flex justify-center items-center">
      <div className="flex gap-4 flex-wrap justify-center">
        {kecamatanData.map((kecamatan) => (
          <div
            key={kecamatan.name}
            className="min-w-[180px] bg-light overflow-hidden transition-transform duration-200 hover:scale-105"
          >
            {/* Gambar dengan border radius sama di semua sisi */}
            <div className="h-[300px] w-full bg-gray-200 flex items-center justify-center text-dark/50 text-sm rounded-[5px] overflow-hidden">
              {kecamatan.name} Placeholder
            </div>

            {/* Bagian teks tanpa corner radius */}
            <div className="py-3">
              <h3 className="text-base font-bold text-dark leading-tight transition-colors duration-200 hover:text-[#E9743B]">
                {kecamatan.name}
              </h3>
              <p className="text-sm text-dark opacity-50 transition-colors duration-200 hover:text-[#E9743B]">
                {kecamatan.placeCount} tempat
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KecamatanCard;
import React from 'react';
import { Icon } from '@iconify/react';

const Footer = () => {
    return (
        <footer className="w-full bg-dark/5 py-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* GRID SECTION */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-16 items-start">

                    {/* Logo Section */}
                    <div className="flex flex-col items-start justify-center">
                        <img
                            src="/images/logo_navbar_footer.png"
                            alt="Kudus UMKM"
                            className="w-44 md:w-48"
                        />
                    </div>

                    {/* Kontak Info */}
                    <div>
                        <h4 className="text-dark font-bold text-lg mb-4">Kontak Info</h4>
                        <div className="space-y-3 text-dark/50 font-medium text-sm">
                            <div className="flex items-center space-x-2">
                                <Icon icon="mynaui:location" className="w-5 h-5 text-dark/50" />
                                <span>Kudus</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Icon icon="mynaui:telephone" className="w-5 h-5 text-dark/50" />
                                <span>+62 856-0121-1156</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Icon icon="ic:outline-email" className="w-5 h-5 text-dark/50" />
                                <span>mchoiranam@gmail.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-dark font-bold text-lg mb-4">Quick Links</h4>
                        <div className="space-y-2">
                            <a href="/beranda" className="block text-dark/50 font-medium text-sm hover:text-orange transition-colors">
                                Beranda
                            </a>
                            <a href="/tentang-umkm" className="block text-dark/50 font-medium text-sm hover:text-orange transition-colors">
                                Tentang UMKM
                            </a>
                            <a href="/kontak" className="block text-dark/50 font-medium text-sm hover:text-orange transition-colors">
                                Kontak
                            </a>
                            <a href="/tentang-kami" className="block text-dark/50 font-medium text-sm hover:text-orange transition-colors">
                                Tentang Kami
                            </a>
                        </div>
                    </div>

                    {/* Kategori UMKM */}
                    <div>
                        <h4 className="text-dark font-bold text-lg mb-4">Kategori UMKM</h4>
                        <div className="space-y-2">
                            <a href="/kategori/makanan" className="block text-dark/50 font-medium text-sm hover:text-orange transition-colors">
                                Makanan
                            </a>
                            <a href="/kategori/minuman" className="block text-dark/50 font-medium text-sm hover:text-orange transition-colors">
                                Minuman
                            </a>
                            <a href="/kategori/jasa" className="block text-dark/50 font-medium text-sm hover:text-orange transition-colors">
                                Jasa
                            </a>
                            <a href="/kategori/barang" className="block text-dark/50 font-medium text-sm hover:text-orange transition-colors">
                                Barang
                            </a>
                            <a href="/kategori/lainnya" className="block text-dark/50 font-medium text-sm hover:text-orange transition-colors">
                                Lainnya
                            </a>
                        </div>
                    </div>
                </div>

                {/* BORDER & COPYRIGHT */}
                <div className="pt-6 mt-10 border-t-2 border-orange/50">
                    <p className="text-center text-dark/50 text-sm font-medium">
                        © 2025 <span className="font-bold text-dark">UMKM WONG KUDUS.</span> All Rights Reserved. Created by{' '}
                        <span className="font-bold text-dark">Amethyst Team</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

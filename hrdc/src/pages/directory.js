import Image from "next/image";
import SearchResults from "./api/searchresults";
import Navbar from "../components/Navbar";

export default function Directory() {
    const handleOpenFile = (fileUrl) => {
        window.open(fileUrl, "_blank");
    };

    return (
        <div className="element-light min-h-screen flex flex-col">
            <Navbar />

            {/* document and background picture */}
            <div className="relative w-full h-64 md:h-96">
                <Image
                    src="/filing-cabinet.jpg"
                    alt="Filing Cabinets"
                    fill
                    className="object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/60 w-[550px] h-[150px] flex items-center justify-center">
                        <h1 className="text-[44px] font-bold text-black"
                            style={{ fontFamily: '"Gotham", Helvetica' }}
                        >DOCUMENTS</h1>
                    </div>
                </div>
            </div>

            {/* priority links - updated with only Employee Handbook */}
            <section
                className="w-full pt-12 pb-11 px-6 flex flex-col items-center space-y-6"
                style={{ backgroundColor: "var(--secondary-gold)", wordSpacing: "0.2rem" }}
            >
                <h2 className="text-[28px] font-bold text-white"
                    style={{ fontFamily: '"Gotham", Helvetica' }}
                >PRIORITY LINKS</h2>
                <div className="flex flex-col space-y-4">
                    <button
                        className="w-[275px] h-[40px] py-2 px-4 text-white text-[16px] font-bold bg-[var(--primary)] hover:bg-[var(--secondary-blue)]"
                        style={{ fontFamily: '"Gotham", Helvetica', wordSpacing: "0.2rem" }}
                        onClick={() => handleOpenFile("/HRDC Employee Handbook August 2024.docx.pdf")}
                    >
                        EMPLOYEE HANDBOOK
                    </button>
                    <button
                        className="w-[275px] h-[40px] py-2 px-4 text-white text-[16px] font-bold bg-[var(--primary)] hover:bg-[var(--secondary-blue)]"
                        style={{ fontFamily: '"Gotham", Helvetica', wordSpacing: "0.2rem" }}
                        onClick={() => handleOpenFile("/HRDC_user_documentation.pdf")}
                    >
                        USER DOCUMENTATION
                    </button>
                    <button
                        className="w-[275px] h-[40px] py-2 px-4 text-white text-[16px] font-bold bg-[var(--primary)] hover:bg-[var(--secondary-blue)]"
                        style={{ fontFamily: '"Gotham", Helvetica', wordSpacing: "0.2rem" }}
                        onClick={() => handleOpenFile("/HRDC_DEV_documentation (1).pdf")}
                    >
                        DEV DOCUMENTATION
                    </button>
                    <button
                        className="w-[275px] h-[40px] py-2 px-4 text-white text-[16px] font-bold bg-[var(--primary)] hover:bg-[var(--secondary-blue)]"
                        style={{ fontFamily: '"Gotham", Helvetica', wordSpacing: "0.2rem" }}
                        onClick={() => window.open("https://www.youtube.com/watch?v=SocVs6axcjo&ab_channel=LoganSchuman", "_blank")}
                    >
                        INTRANET DEMO
                    </button>
                </div>
            </section>

            {/* find a document */}
            <section className="flex flex-col items-center py-14 px-4 bg-white">
                <h2 className="text-[30px] font-bold mb-4"
                    style={{ color: "var(--primary)", fontFamily: '"Gotham", Helvetica', wordSpacing: "0.2rem" }}
                >
                    FIND A DOCUMENT
                </h2>
                <SearchResults />
            </section>

            {/* footer */}
            <footer className="w-full bg-gray-900 text-center py-4 mt-auto"
                    style= {{backgroundColor: "var(--secondary-blue)", color: "rgba(255, 255, 255, 0.8)"  }}>
                <p className="text-[10px]">&copy; 2025 HRDC, INC. ALL RIGHTS RESERVED</p>
            </footer>
        </div>
    );
}
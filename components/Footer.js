import Link from "next/link";

export default function Footer() {
    return (
        <>
            <footer className="bg-darkgray p-10 text-white">
                <div className="footer_info">
                    <p>© nextBlog - 2021</p>
                    <p>made with ♥</p>
                    <br />
                    <b>Giorgio Franco, Noah Emmenegger, Nicolas Bürgler</b>
                </div>
            </footer>
        </>
    )
}
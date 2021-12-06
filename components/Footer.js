import Link from "next/link";

export default function Footer() {
    return (
        <>
            <footer className="bg-darkgray p-10 text-white">
                <h1>Footer</h1>
                <div>
                    logo
                </div>
                <a href="https://www.freepik.com/vectors/people">People vector created by pch.vector - www.freepik.com</a>
                <div className="invite_footer">
                    <h2>general_question</h2>
                    <div>
                        <Link href="/">Link</Link>
                    </div>
                </div>
                <div className="flex">
                    <div className="d-block">
                        <span>CommandList</span>
                        <p>general_slogan</p>
                    </div>
                    <div className="flex">
                        <div className="flex-row">
                            <Link href="/">Link</Link>
                            <Link href="/">Link</Link>
                            <Link href="/">Link</Link>
                        </div>
                        <div>
                            <Link href="/">Link</Link>
                            <Link href="/">Link</Link>
                            <Link href="/">Link</Link>
                        </div>
                        <div>
                            <Link href="/">Link</Link>
                            <Link href="mailto:">Contact</Link>
                        </div>
                    </div>
                </div>
                <div className="footer_info">
                    <p>© CommandList - 2021</p>
                    <p>code with ♥</p>
                </div>
            </footer>
        </>
    )
}
import { Facebook, Twitter, Youtube } from "lucide-react"
import mon_logo from "../assets/mon_logo.svg"
const Footer = () => {
  return (
    <div>
        <footer className="footer footer-horizontal footer-center mt-20  bg-white-300  border-b border-none shadow-sm p-10">
  <aside>
    <img src={mon_logo} className="h-10  object-cover"/>

    <p>Copyright © {new Date().getFullYear()} - Tous droits reservés </p>
  </aside>
  <nav>
    <div className="grid grid-flow-col gap-4">
    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <Twitter className="w-6 h-6 text-current" />
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                        <Youtube className="w-6 h-6 text-current" />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <Facebook className="w-6 h-6 text-current" />
                    </a>

    </div>
  </nav>
</footer>
      
    </div>
  )
}

export default Footer

import Link from 'next/link'
import Logo from '../../icons/Logo'
import GitHub from '../../icons/GitHub'
import s from './Footer.module.css'

export default function Footer () {
  return (
    <footer className="mx-auto px-6 bg-primary-2">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-accents-2 py-12 text-primary transition-colors duration-150 bg-primary-2">
        <div className="col-span-1 lg:col-span-2">
          <Link href="/">
            <a className="flex flex-initial items-center font-bold md:mr-24">
              <span className="mr-2">
                <Logo />
              </span>
              <span>handle.events</span>
            </a>
          </Link>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <ul className="flex flex-initial flex-col md:flex-1">
            <li className="py-3 md:py-0 md:pb-4">
              <Link href="/">
                <a className="text-primary hover:text-accents-6 transition ease-in-out duration-150">
                  Home
                </a>
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link href="/about">
                <a className="text-primary hover:text-accents-6 transition ease-in-out duration-150">
                  About
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <ul className="flex flex-initial flex-col md:flex-1">
            <li className="py-3 md:py-0 md:pb-4">
              <p className="text-primary font-bold hover:text-accents-6 transition ease-in-out duration-150">
                Legal
              </p>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link href="/privacy">
                <a className="text-primary hover:text-accents-6 transition ease-in-out duration-150">
                  Privacy Policy
                </a>
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link href="/terms">
                <a className="text-primary hover:text-accents-6 transition ease-in-out duration-150">
                  Terms of Use
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1 lg:col-span-6 flex items-start lg:justify-end text-primary">
          <div className="flex space-x-6 items-center h-10">
            <a
              aria-label="Github Repository"
              href="https://github.com/r0zar/nakama-client"
              className={s.link}
            >
              <GitHub />
            </a>
          </div>
        </div>
      </div>
      <div className="py-12 flex flex-col md:flex-row justify-between items-center space-y-4 bg-primary-2">
        <div>
          <span>&copy; 2020 Point Blank Dev LLC. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}


import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { themeState } from '../recoil/atom'
import { Moon, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"

const CustomThemeToggle = () => {
  const [theme, setTheme] = useRecoilState(themeState)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {theme === 'light' ? <Moon className="h-[1.2rem] w-[1.2rem]" /> : <Sun className="h-[1.2rem] w-[1.2rem]" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export default CustomThemeToggle


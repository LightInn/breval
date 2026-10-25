'use client'
import { Monitor, Moon, Sun } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
export default function ThemeSwitcher() {
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)
	const t = useTranslations('navigation')
	useEffect(() => setMounted(true), [])
	const icons = { light: Sun, dark: Moon, system: Monitor }
	const Icon = icons[mounted ? theme || 'system' : 'system'] || Monitor
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					aria-label={t('appearance')}
					size="icon"
					variant="outline"
					className="h-10 w-10 shrink-0 rounded-md bg-card/90"
					disabled={!mounted}
				>
					<Icon className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuRadioGroup value={mounted ? theme : 'system'} onValueChange={setTheme}>
					<DropdownMenuRadioItem value="light">
						<Sun className="mr-2 h-4 w-4" />
						{t('light')}
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="dark">
						<Moon className="mr-2 h-4 w-4" />
						{t('dark')}
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="system">
						<Monitor className="mr-2 h-4 w-4" />
						{t('system')}
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

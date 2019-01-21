import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

const Header = () => (
	<header class={style.header}>
		<Link href="/"><h1>Upframe</h1></Link>
		<nav>
			<Link activeClassName={style.active} href="/team">Team</Link>
			<Link activeClassName={style.active} href="/events">Events</Link>
			<Link activeClassName={style.active} href="/internships">Internships</Link>
		</nav>
	</header>
);

export default Header;

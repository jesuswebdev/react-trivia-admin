import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class SideMenu extends Component {
	render() {
		const path = this.props.location.pathname;
		return (
			<aside className="menu">
				<p className="menu-label">General</p>
				<ul className="menu-list">
					<li><Link to="/" className={path === '/dashboard' ? 'is-active':null }>Panel de Control</Link></li>
				</ul>
				<p className="menu-label">Categorías</p>
				<ul className="menu-list">
					<li><Link to="/category" className={path === '/category' ? 'is-active':null }>Administrar Categorías</Link></li>
					<li><Link to="/category/new" className={path === '/category/new' ? 'is-active':null }>Crear Categoría</Link></li>
				</ul>
				<p className="menu-label">Preguntas</p>
				<ul className="menu-list">
					<li><Link to="/questions" className={path === '/questions' ? 'is-active':null }>Administrar Preguntas</Link></li>
					<li><Link to="/questions/new" className={path === '/questions/new' ? 'is-active':null }>Crear Pregunta</Link></li>
					<li><Link to="/suggestions" className={path === '/suggestions' ? 'is-active':null }>Ver Sugerencias</Link></li>
				</ul>
				<p className="menu-label">Usuarios</p>
				<ul className="menu-list">
					<li><a>Administrar Usuarios</a></li>
					<li><a>Crear Usuario</a></li>
				</ul>
				<p className="menu-label">Juegos</p>
				<ul className="menu-list">
					<li><a>Panel de control de Juegos</a></li>
				</ul>
			</aside>
		);
	}
}

export default withRouter(SideMenu);
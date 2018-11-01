import React from 'react';

const Paginator = (props) => {

	let paginationLinks;

	if (props.total <= 5) {
		paginationLinks = [...Array(props.total)].map((link, index) => {
			return <li><a className={["pagination-link", ((index + 1) === props.current) ? "is-current" : ""].join(" ")} onClick={() => props.onClickNextPage(index+1)} aria-label={"Pagina " + (index + 1)} aria-current={props.current === (index+1) ? "page" : null} >{index + 1}</a></li>
		})
	}
	else {
		if (props.current < 4) {
			paginationLinks = [
			<li key={1}><a className={["pagination-link", 1 === props.current ? "is-current" : ""].join(" ")} onClick={() => props.onClickNextPage(1)} aria-label="Ir a la página 1">1</a></li>,
			<li key={2}><a className={["pagination-link", 2 === props.current ? "is-current" : ""].join(" ")} onClick={() => props.onClickNextPage(2)} aria-label="Ir a la página 2">2</a></li>,
			<li key={3}><a className={["pagination-link", 3 === props.current ? "is-current" : ""].join(" ")} onClick={() => props.onClickNextPage(3)} aria-label="Ir a la página 3">3</a></li>,
			<li key={4}><a className={["pagination-link", 4 === props.current ? "is-current" : ""].join(" ")} onClick={() => props.onClickNextPage(4)} aria-label="Ir a la página 4">4</a></li>,
			<li key="elipsis">< span className="pagination-ellipsis">&hellip;</span></li>,
		    <li key={props.total}><a className={["pagination-link", props.total === props.current ? "is-current" : ""].join(" ")} onClick={() => props.onClickNextPage(props.total)} aria-label={"Ir a la página " + props.total}>{props.total}</a></li>
			];
		}
		else if (props.total - props.current < 4) {
			paginationLinks = [
			<li key={1}><a className={["pagination-link", 1 === props.current ? "is-current" : ""].join(" ")} onClick={() => props.onClickNextPage(1)} aria-label="Ir a la página 1">1</a></li>,
			<li key="elipsis"><span className="pagination-ellipsis">&hellip;</span></li>,
			<li key={props.total-3}><a className={["pagination-link", props.total-3 === props.current ? "is-current" : ""].join(" ")} onClick={() => props.onClickNextPage(props.total-3)} aria-label={"Ir a la página " + props.total-3}>{props.total-3}</a></li>,
			<li key={props.total-2}><a className={["pagination-link", props.total-2 === props.current ? "is-current" : ""].join(" ")} onClick={() => props.onClickNextPage(props.total-2)} aria-label={"Ir a la página " + props.total-2}>{props.total-2}</a></li>,
			<li key={props.total-1}><a className={["pagination-link", props.total-1 === props.current ? "is-current" : ""].join(" ")} onClick={() => props.onClickNextPage(props.total-1)} aria-label={"Ir a la página " + props.total-1}>{props.total-1}</a></li>,
		    <li key={props.total}><a className={["pagination-link", props.total === props.current ? "is-current" : ""].join(" ")} onClick={() => props.onClickNextPage(props.total)} aria-label={"Ir a la página " + props.total}>{props.total}</a></li>
			];
		}
		else {
			paginationLinks = [
			<li key={1}><a className={["pagination-link", 1 === props.current ? "is-current" : ""].join(" ")} onClick={() => props.onClickNextPage(1)} aria-label="Ir a la página 1">1</a></li>,
		    <li key="elipsis1"><span className="pagination-ellipsis">&hellip;</span></li>,
		    <li key={props.current-1}><a className={["pagination-link", (props.current-1 === props.current) ? "is-current" : ""].join(" ")} onClick={() => props.onClickNextPage(props.current-1)} aria-label={"Ir a la página " + props.current-1}>{props.current-1}</a></li>,
		    <li key={props.current}><a className="pagination-link is-current" onClick={() => props.onClickNextPage()} aria-label={"Página " + props.current} aria-current="page">{props.current}</a></li>,
		    <li key={props.current+1}><a className={["pagination-link", (props.current+1 === props.current) ? "is-current" : ""].join(" ")} onClick={() => props.onClickNextPage(props.current+1)} aria-label={"Ir a la página " + props.current+1}>{props.current+1}</a></li>,
		    <li key="elipsis2"><span className="pagination-ellipsis">&hellip;</span></li>,
		    <li key={props.total}><a className={["pagination-link", (props.total === props.current) ? "is-current" : ""].join(" ")} onClick={() => props.onClickNextPage(props.total)} aria-label={"Ir a la página " + props.total}>{props.total}</a></li>
			];
		}
	}
	return (
		<nav className="pagination is-centered" role="navigation" aria-label="pagination">
		  {props.current > 1 && <a className="pagination-previous" onClick={() => props.onClickNextPage(props.current - 1)}>Anterior</a>}
		  {props.current < props.total && <a className="pagination-next" onClick={() => props.onClickNextPage(props.current + 1)}>Siguiente</a>}
		  <ul className="pagination-list">
		  	{paginationLinks}
		  </ul>
		</nav>
		);
}

export default Paginator;
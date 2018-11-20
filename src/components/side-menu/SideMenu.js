import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

const SubMenu = Menu.SubMenu;

class SideMenu extends React.Component {
  state = {
    width: 256,
    height: window.innerHeight - 64
  };

  setHeight = () => this.setState({ height: window.innerHeight - 64 });

  componentDidMount() {
    window.addEventListener('resize', this.setHeight);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setHeight);
  }

  shouldComponentUpdate(_, nextState) {
    return this.state.height !== nextState.height;
  }

  render() {
    return (
      <Menu style={this.state} mode="inline">
        <SubMenu key="sub1" title="Categorías">
          <Menu.Item key="1">
            <Link to="/category">Administrar Categorías</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/category/new">Crear Categoría</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title="Preguntas">
          <Menu.Item key="3">
            <Link to="/questions">Administrar Preguntas</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/questions/new">Crear Pregunta</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/suggestions">Administrar Sugerencias</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default SideMenu;

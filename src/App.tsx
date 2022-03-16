import React from 'react';
import Button from './components/Button/button'
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';

function App() {
  return (
    <div className="App">
      <Menu defaultIndex={'0'} mode={'vertical'} defaultOpenSubMenus={['3']} onSelect={(index) => { alert(index) }}>
        <MenuItem >
          <div>1</div>
        </MenuItem>
        <MenuItem >
          <div>2</div>
        </MenuItem>
        <MenuItem >
          <div>3</div>
        </MenuItem>
        <SubMenu title='title'>
          <MenuItem>
            <div>4</div>
          </MenuItem>
        </SubMenu>
      </Menu>
      <Button btnType={'link'} href="www.baidu.com" disabled={true}>baidu</Button>
      <Button btnType={'primary'} >hello</Button>
      <Button btnType={'default'} >hello</Button>
      <Button btnType={'danger'} onClick={() => { alert('danger') }} >hello</Button>
      <Button btnType={'default'} size={'lg'} >hello</Button>
      <Button btnType={'default'} size={'sm'}>hello</Button>
    </div>
  );
}

export default App;

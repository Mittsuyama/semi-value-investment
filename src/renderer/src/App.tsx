import { Route, Switch, Redirect, useLocation, useHistory } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { Nav } from '@douyinfe/semi-ui';
import { IconIntro, IconConfig, IconList, IconHeart } from '@douyinfe/semi-icons-lab';
import { RouterKey } from '@renderer/types';
import { Home, Settings, DataManage, FavManage } from '@renderer/pages';
import { useInit } from '@renderer/hooks';
import { NavFooter } from '@renderer/components/layout-components';
import { currentStockDetailPagePropsAtom } from '@renderer/models';
import './global.css';

function App(): JSX.Element {
  const history = useHistory();
  const { pathname } = useLocation();
  const setCurrentProps = useSetAtom(currentStockDetailPagePropsAtom);

  useInit();

  return (
    <>
      <div className="w-full h-full flex flex-col bg-semi-color-bg-0">
        <div className="flex-none w-full">
          <Nav
            className="border-b-semi-color-border border-b-[1px]"
            mode="horizontal"
            selectedKeys={[pathname]}
            onSelect={(e) => {
              history.push(String(e.itemKey));
              setCurrentProps(undefined);
            }}
            items={[
              { itemKey: RouterKey.HOME, text: '主页', icon: <IconIntro /> },
              { itemKey: RouterKey.FAV_MANAGE, text: '收藏管理', icon: <IconHeart /> },
              { itemKey: RouterKey.DATA_MANAGE, text: '数据管理', icon: <IconList /> },
              { itemKey: RouterKey.SETTINGS, text: '设置', icon: <IconConfig /> },
            ]}
            footer={<NavFooter />}
          />
        </div>
        <div className="flex-1 overflow-hidden">
          <Switch>
            <Route exact path={RouterKey.HOME} component={Home} />
            <Route exact path={RouterKey.FAV_MANAGE} component={FavManage} />
            <Route exact path={RouterKey.DATA_MANAGE} component={DataManage} />
            <Route exact path={RouterKey.SETTINGS} component={Settings} />
            <Route path="">
              <Redirect to={RouterKey.HOME} />
            </Route>
          </Switch>
        </div>
      </div>
    </>
  );
}

export default App;

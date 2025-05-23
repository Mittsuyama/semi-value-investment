import { memo, ReactNode, useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { Divider, Button } from '@douyinfe/semi-ui';
import {
  currentStockDetailPagePropsAtom,
  favoriteStockIdListAtom,
  ratingMapAtom,
} from '@renderer/models';
import { IStockProfile } from '@shared/types';
import { useFavStockProfileList } from '@renderer/hooks';
import { StockProfileCard } from '@renderer/components/StockProfileCard';

export const Favorite = memo(() => {
  const favList = useAtomValue(favoriteStockIdListAtom);
  const setCurrent = useSetAtom(currentStockDetailPagePropsAtom);
  const ratingMap = useAtomValue(ratingMapAtom);

  const [refreshCount, setRefreshCount] = useState(0);

  const { profileList } = useFavStockProfileList();

  const listRender = (title: string, list: IStockProfile[], extra?: ReactNode) => {
    return (
      <div className="my-4">
        <div className="my-2 flex items-center gap-2">
          <div className="font-bold text-lg text-semi-color-text-0">{title}</div>
          {list.length ? (
            <div className="text-semi-color-text-3 text-xs">共{list.length}条数据</div>
          ) : null}
          {extra}
        </div>
        <div className="grid grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
          {list.map((item) => (
            <StockProfileCard
              key={`${item.id}-${refreshCount}`}
              profile={item}
              onMoreInfo={() =>
                setCurrent({
                  stockId: item.id,
                  list: favList?.slice().sort((a, b) => ratingMap[b] - ratingMap[a]),
                })
              }
            />
          ))}
          {list.length === 0 && <div className="my-2 text-semi-color-text-3">暂无数据</div>}
        </div>
      </div>
    );
  };

  return (
    <div className="px-6 w-full h-full overflow-auto">
      {listRender(
        '买入',
        profileList.filter((item) => ratingMap[item.id] === 5),
        <div className="ml-auto my-2">
          <Button theme="solid" onClick={() => setRefreshCount((pre) => pre + 1)}>
            刷新数据
          </Button>
        </div>,
      )}
      {listRender(
        '增持',
        profileList.filter((item) => ratingMap[item.id] === 4),
      )}
      {listRender(
        '中性',
        profileList.filter((item) => ratingMap[item.id] === 3),
      )}
      {listRender(
        '减持',
        profileList.filter((item) => ratingMap[item.id] === 2),
      )}
      {listRender(
        '卖出',
        profileList.filter((item) => ratingMap[item.id] === 1),
      )}
      <Divider margin={48} align="center">
        以下是未持有数据
      </Divider>
      {listRender(
        '未持有',
        profileList.filter((item) => !ratingMap[item.id]),
      )}
    </div>
  );
});

Favorite.displayName = 'Home';

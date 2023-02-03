import styles from './Search.module.scss';
import classNames from 'classnames/bind';

// Outside libraries
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PropperWrapper } from '~/components/Propper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
// Components
import { useState, useRef } from 'react';
import AccountItem from '~/components/AccountItem';
import { ClearIcon, SearchIcon } from '~/icons';

const cx = classNames.bind(styles);
function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([1, 2, 3]);
  const [showResult, setShowResult] = useState(true);
  const inputRef = useRef();
  const handleClear = () => {
    setSearchValue('');
    setSearchResult([]);
    inputRef.current.focus();
  };
  const handleShowResult = () => {
    setShowResult(false);
  };
  return (
    <Tippy
      onClickOutside={handleShowResult}
      interactive
      visible={searchResult.length > 0 && showResult}
      render={(attrs) => (
        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
          <PropperWrapper>
            <h3 className={cx('search-title')}>Accounts</h3>
            <AccountItem />
            <AccountItem />
            <AccountItem />
            <AccountItem />
          </PropperWrapper>
        </div>
      )}
    >
      <div className={cx('search')}>
        <input
          ref={inputRef}
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          onFocus={() => setShowResult(true)}
          placeholder="Search accounts and videos"
          spellCheck={true}
        />
        {/* <button className={cx('loading')}>
          <FontAwesomeIcon icon={faSpinner} />
        </button> */}
        {searchValue && (
          <button className={cx('clear')} onClick={handleClear}>
            <ClearIcon />
          </button>
        )}

        <button className={cx('search-btn')}>
          <SearchIcon />
        </button>
      </div>
    </Tippy>
  );
}
export default Search;

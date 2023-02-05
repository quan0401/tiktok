import styles from './Search.module.scss';
import classNames from 'classnames/bind';

// Outside libraries
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PropperWrapper } from '~/components/Propper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

// Components
import { useState, useRef, useEffect } from 'react';
import AccountItem from '~/components/AccountItem';
import { ClearIcon, SearchIcon } from '~/icons';
import { useDebounce } from '~/hooks';
import * as searchServices from '~/apiServices/searchServices';

const cx = classNames.bind(styles);
function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);
  const debounced = useDebounce(searchValue, 500);

  const inputRef = useRef();

  const handleClear = () => {
    setSearchValue('');
    setSearchResult([]);
    inputRef.current.focus();
  };
  const handleShowResult = () => {
    setShowResult(false);
  };
  const handleInput = (e) => {
    const inputValue = e.target.value;
    if (!inputValue.startsWith(' ')) {
      setSearchValue(inputValue);
    }
  };

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }
    setLoading(true);
    const fetch = async () => {
      const result = await searchServices.search(debounced);
      setSearchResult(result);
      setLoading(false);
    };
    fetch();
  }, [debounced]);

  return (
    <Tippy
      onClickOutside={handleShowResult}
      interactive
      visible={searchResult.length > 0 && showResult}
      render={(attrs) => (
        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
          <PropperWrapper>
            <h3 className={cx('search-title')}>Accounts</h3>
            {searchResult.map((result, index) => {
              return <AccountItem onClick={() => setShowResult(false)} key={index} data={result} />;
            })}
          </PropperWrapper>
        </div>
      )}
    >
      <div className={cx('search')}>
        <input
          ref={inputRef}
          value={searchValue}
          onChange={handleInput}
          onFocus={() => setShowResult(true)}
          placeholder="Search accounts and videos"
          spellCheck={true}
        />
        {loading && (
          <button className={cx('loading')}>
            <FontAwesomeIcon icon={faSpinner} />
          </button>
        )}
        {searchValue && !loading && (
          <button className={cx('clear')} onClick={handleClear}>
            <ClearIcon />
          </button>
        )}

        <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
          <SearchIcon />
        </button>
      </div>
    </Tippy>
  );
}
export default Search;

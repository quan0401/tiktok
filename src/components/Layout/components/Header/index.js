import { useState } from 'react';
// Font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronCircleUp,
  faChevronUp,
  faCircleHalfStroke,
  faCircleXmark,
  faCloudArrowUp,
  faEarthAmericas,
  faEllipsisVertical,
  faEnvelope,
  faEnvelopeOpenText,
  faKeyboard,
  faMagnifyingGlass,
  faMessage,
  faPaperPlane,
  faPlus,
  faQuestionCircle,
  faSpinner,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional

import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets/images';
import { Wrapper as PropperWrapper } from '~/components/Propper';
import AccountItem from '~/components/AccountItem';
import Button from '~/components/Button';
import Menu from '~/components/Propper/Menu';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faEarthAmericas} />,
    title: 'English',
    children: {
      title: 'Language',
      data: [
        {
          type: 'language',
          title: 'English',
          code: 'en',
          children: {
            title: 'English types',
            data: [
              {
                title: 'English 1',
                code: 'en1',
              },
              {
                title: 'English 2',
                code: 'en2',
              },
            ],
          },
        },
        {
          type: 'language',
          title: 'Tiếng Việt',
          code: 'viet',
        },
      ],
    },
  },
  {
    icon: <FontAwesomeIcon icon={faQuestionCircle} />,
    title: 'Feedback end help',
    to: '/feedback',
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard} />,
    title: 'Keyboards shortcuts',
  },
  {
    icon: <FontAwesomeIcon icon={faCircleHalfStroke} />,
    title: 'Dark mode',
  },
];

function Header() {
  const [searchResult, setSearchResult] = useState([]);
  // Handle logic
  const handleMenuChange = (menuItem) => {
    console.log(menuItem);
  };

  const currentUser = true;
  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('logo')}>
          <img src={images.logo} alt="Tiktok" />
        </div>
        <Tippy
          interactive
          visible={searchResult.length > 0}
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
            <input placeholder="Search accounts and videos" spellCheck={true} />
            <button className={cx('loading')}>
              <FontAwesomeIcon icon={faSpinner} />
            </button>
            <button className={cx('clear')}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>

            <button className={cx('search-btn')}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </Tippy>

        <div className={cx('action')}>
          {currentUser ? (
            <>
              <Button text leftIcon={<FontAwesomeIcon icon={faChevronUp} />}>
                Upload
              </Button>
              <Button icon middleIcon={<FontAwesomeIcon icon={faPaperPlane} />}></Button>
              <Button icon middleIcon={<FontAwesomeIcon icon={faEnvelopeOpenText} />}></Button>
              <img
                className={cx('current-user-avatar')}
                src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="Avatar"
              />
            </>
          ) : (
            <>
              <Button text leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                Upload
              </Button>

              <Button primary>Log in</Button>

              <Menu items={MENU_ITEMS} onChange={handleMenuChange}>
                <button className={cx('more-btn')}>
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>
              </Menu>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default Header;

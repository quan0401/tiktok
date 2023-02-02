import { useState } from 'react';
// Font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightFromBracket,
  faChevronUp,
  faCircleHalfStroke,
  faCircleXmark,
  faEarthAmericas,
  faEllipsisVertical,
  faEnvelopeOpenText,
  faGear,
  faKeyboard,
  faMagnifyingGlass,
  faMusic,
  faPaperPlane,
  faPlus,
  faQuestionCircle,
  faSpinner,
  faVideoCamera,
} from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets/images';
import { Wrapper as PropperWrapper } from '~/components/Propper';
import AccountItem from '~/components/AccountItem';
import Button from '~/components/Button';
import Menu from '~/components/Propper/Menu';
import { faUser } from '@fortawesome/free-regular-svg-icons';

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
  const userMenu = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: 'View profile',
      to: '/profile',
    },
    {
      icon: <FontAwesomeIcon icon={faMusic} />,
      title: 'Get Coins',
    },
    {
      icon: <FontAwesomeIcon icon={faVideoCamera} />,
      title: 'LIVE Studio',
      to: '/feedback',
    },
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: 'Settings',
      to: '/setting',
    },
    ...MENU_ITEMS,
    {
      icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
      title: 'Log out',
      to: '/logout',
      separate: true,
    },
  ];
  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('logo')}>
          <img src={images.logo} alt="Tiktok" />
        </div>
        <HeadlessTippy
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
        </HeadlessTippy>

        <div className={cx('action')}>
          {currentUser ? (
            <>
              <Button text leftIcon={<FontAwesomeIcon icon={faChevronUp} />}>
                Upload
              </Button>
              <Tippy delay={[0, 100]} content="Messages" placement="bottom">
                <div className={cx('btn-icon')}>
                  <Button icon middleIcon={<FontAwesomeIcon icon={faPaperPlane} />}></Button>
                </div>
              </Tippy>
              <Tippy delay={[0, 100]} content="Inbox" placement="bottom">
                <div className={cx('btn-icon')}>
                  <Button icon middleIcon={<FontAwesomeIcon icon={faEnvelopeOpenText} />}></Button>
                </div>
              </Tippy>
            </>
          ) : (
            <>
              <Button text leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                Upload
              </Button>

              <Button primary>Log in</Button>
            </>
          )}
          <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
            {currentUser ? (
              <img
                className={cx('current-user-avatar')}
                src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="Avatar"
              />
            ) : (
              <button className={cx('more-btn')}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            )}
          </Menu>
        </div>
      </div>
    </div>
  );
}
export default Header;

import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import CursorChat from '@yomo/cursor-chat-react';
import { useEffect, useState } from 'react';
import { connect } from '@/utils/presence';
import { IPresence } from '@yomo/presence';
import "@yomo/cursor-chat-react/dist/style.css"
import { createPresence } from '@yomo/presence';
import GroupHug from '@yomo/group-hug-react';
import { faker } from '@faker-js/faker';
import '@yomo/group-hug-react/dist/style.css';


export default function Home() {
  const [presenceClient, setPresenceClient] =
    useState<Promise<IPresence> | null>(null);
  const [id, setId] = useState<string>('');
  useEffect(() => {
    (async () => {
      const { presencePromise, id } = connect();
      setPresenceClient(presencePromise);
      setId(id);
    })();
    return () => {
      setPresenceClient(null);
    };
    
  }, []);
  const [presence, setPresence] = useState<any>();
  const avatar = `https://robohash.org/${id}`;
  const randomName = faker.name.fullName();
  useEffect(() => {
    const presence = createPresence({
      url: 'https://prscd2.allegro.earth/v1',
      publicKey: 'GIctGofSPwjGEYuPztgvvuBfKZsnPcad2te1mjdum',
      id,
      appId: 'lzq',
    });
    setPresence(presence);
  }, [id]);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main} style={{background: `url('./bg.svg')`}}>
        {presence && (
          <CursorChat
            presence={presence}
            id={id}
            avatar={avatar}
            name={randomName}
          />
        )}
        {presence ? (<div style={{
    position:'absolute',
    top:'40px',
    right:'40px'}}>
        <GroupHug
          presence={presence}
          id={id}
          avatar={avatar}
          name={randomName}
        /></div>
      ) : null}
      <div 
    style={{
      position: 'fixed',
  bottom:'24px',
  right:'87px',
  color:'#252525',
  display: 'inline-block',
fontSize: '14px',
backgroundColor:'#272727',
borderRadius:'20px'}}>
    <div style={{marginRight:'10px',marginLeft:'10px'}}>
        <div>
         <svg width="337" height="32" viewBox="0 0 337 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.11861 21V10.8182H4.74787C5.54001 10.8182 6.19626 10.9624 6.71662 11.2507C7.23698 11.5391 7.62642 11.9335 7.88494 12.4339C8.14347 12.9311 8.27273 13.4912 8.27273 14.1143C8.27273 14.7408 8.14181 15.3042 7.87997 15.8047C7.62145 16.3018 7.23035 16.6963 6.70668 16.9879C6.18632 17.2763 5.53172 17.4205 4.7429 17.4205H2.24716V16.1179H4.60369C5.10417 16.1179 5.51018 16.0317 5.82173 15.8594C6.13329 15.6837 6.36198 15.4451 6.50781 15.1435C6.65365 14.8419 6.72656 14.4988 6.72656 14.1143C6.72656 13.7299 6.65365 13.3885 6.50781 13.0902C6.36198 12.7919 6.13163 12.5582 5.81676 12.3892C5.50521 12.2202 5.09422 12.1357 4.58381 12.1357H2.65483V21H1.11861ZM13.0753 21.1541C12.3594 21.1541 11.7346 20.9901 11.201 20.6619C10.6674 20.3338 10.2531 19.8748 9.9581 19.2848C9.66312 18.6948 9.51562 18.0054 9.51562 17.2166C9.51562 16.4245 9.66312 15.7318 9.9581 15.1385C10.2531 14.5452 10.6674 14.0845 11.201 13.7564C11.7346 13.4283 12.3594 13.2642 13.0753 13.2642C13.7912 13.2642 14.416 13.4283 14.9496 13.7564C15.4832 14.0845 15.8975 14.5452 16.1925 15.1385C16.4875 15.7318 16.6349 16.4245 16.6349 17.2166C16.6349 18.0054 16.4875 18.6948 16.1925 19.2848C15.8975 19.8748 15.4832 20.3338 14.9496 20.6619C14.416 20.9901 13.7912 21.1541 13.0753 21.1541ZM13.0803 19.9062C13.5443 19.9062 13.9287 19.7836 14.2337 19.5384C14.5386 19.2931 14.764 18.9666 14.9098 18.5589C15.0589 18.1513 15.1335 17.7022 15.1335 17.2116C15.1335 16.7244 15.0589 16.277 14.9098 15.8693C14.764 15.4583 14.5386 15.1286 14.2337 14.88C13.9287 14.6314 13.5443 14.5071 13.0803 14.5071C12.6129 14.5071 12.2251 14.6314 11.9169 14.88C11.612 15.1286 11.3849 15.4583 11.2358 15.8693C11.09 16.277 11.017 16.7244 11.017 17.2116C11.017 17.7022 11.09 18.1513 11.2358 18.5589C11.3849 18.9666 11.612 19.2931 11.9169 19.5384C12.2251 19.7836 12.6129 19.9062 13.0803 19.9062ZM19.7173 21L17.4702 13.3636H19.0064L20.5028 18.9716H20.5774L22.0788 13.3636H23.6151L25.1065 18.9467H25.1811L26.6676 13.3636H28.2038L25.9616 21H24.4453L22.8942 15.4865H22.7798L21.2287 21H19.7173ZM32.6733 21.1541C31.9209 21.1541 31.273 20.9934 30.7294 20.6719C30.1892 20.3471 29.7715 19.8913 29.4766 19.3047C29.1849 18.7147 29.0391 18.0237 29.0391 17.2315C29.0391 16.4493 29.1849 15.7599 29.4766 15.1634C29.7715 14.5668 30.1825 14.1011 30.7095 13.7663C31.2398 13.4316 31.8596 13.2642 32.5689 13.2642C32.9998 13.2642 33.4174 13.3355 33.8217 13.478C34.2261 13.6205 34.589 13.8442 34.9105 14.1491C35.232 14.4541 35.4856 14.8501 35.6712 15.3374C35.8568 15.8213 35.9496 16.4096 35.9496 17.1023V17.6293H29.8793V16.5156H34.4929C34.4929 16.1245 34.4134 15.7782 34.2543 15.4766C34.0952 15.1716 33.8714 14.9313 33.5831 14.7557C33.2981 14.58 32.9633 14.4922 32.5788 14.4922C32.1612 14.4922 31.7966 14.5949 31.4851 14.8004C31.1768 15.0026 30.9382 15.2678 30.7692 15.5959C30.6035 15.9207 30.5206 16.2737 30.5206 16.6548V17.5249C30.5206 18.0353 30.6101 18.4695 30.7891 18.8274C30.9714 19.1854 31.2249 19.4588 31.5497 19.6477C31.8745 19.8333 32.254 19.9261 32.6882 19.9261C32.9699 19.9261 33.2268 19.8864 33.4588 19.8068C33.6908 19.724 33.8913 19.6013 34.0604 19.4389C34.2294 19.2765 34.3587 19.076 34.4482 18.8374L35.8551 19.0909C35.7424 19.5052 35.5402 19.8681 35.2486 20.1797C34.9602 20.4879 34.5973 20.7282 34.1598 20.9006C33.7256 21.0696 33.2301 21.1541 32.6733 21.1541ZM37.5989 21V13.3636H39.0357V14.5767H39.1152C39.2544 14.1657 39.4997 13.8426 39.851 13.6072C40.2057 13.3686 40.6067 13.2493 41.0542 13.2493C41.147 13.2493 41.2563 13.2526 41.3823 13.2592C41.5115 13.2659 41.6126 13.2741 41.6855 13.2841V14.706C41.6259 14.6894 41.5198 14.6712 41.3674 14.6513C41.2149 14.6281 41.0624 14.6165 40.91 14.6165C40.5587 14.6165 40.2454 14.6911 39.9703 14.8402C39.6986 14.986 39.4831 15.1899 39.324 15.4517C39.165 15.7102 39.0854 16.0052 39.0854 16.3366V21H37.5989ZM45.9897 21.1541C45.2373 21.1541 44.5894 20.9934 44.0458 20.6719C43.5056 20.3471 43.0879 19.8913 42.793 19.3047C42.5013 18.7147 42.3555 18.0237 42.3555 17.2315C42.3555 16.4493 42.5013 15.7599 42.793 15.1634C43.0879 14.5668 43.4989 14.1011 44.0259 13.7663C44.5562 13.4316 45.176 13.2642 45.8853 13.2642C46.3162 13.2642 46.7338 13.3355 47.1381 13.478C47.5425 13.6205 47.9054 13.8442 48.2269 14.1491C48.5484 14.4541 48.802 14.8501 48.9876 15.3374C49.1732 15.8213 49.266 16.4096 49.266 17.1023V17.6293H43.1957V16.5156H47.8093C47.8093 16.1245 47.7298 15.7782 47.5707 15.4766C47.4116 15.1716 47.1879 14.9313 46.8995 14.7557C46.6145 14.58 46.2797 14.4922 45.8952 14.4922C45.4776 14.4922 45.113 14.5949 44.8015 14.8004C44.4933 15.0026 44.2546 15.2678 44.0856 15.5959C43.9199 15.9207 43.837 16.2737 43.837 16.6548V17.5249C43.837 18.0353 43.9265 18.4695 44.1055 18.8274C44.2878 19.1854 44.5413 19.4588 44.8661 19.6477C45.1909 19.8333 45.5704 19.9261 46.0046 19.9261C46.2863 19.9261 46.5432 19.8864 46.7752 19.8068C47.0072 19.724 47.2077 19.6013 47.3768 19.4389C47.5458 19.2765 47.6751 19.076 47.7646 18.8374L49.1715 19.0909C49.0588 19.5052 48.8567 19.8681 48.565 20.1797C48.2766 20.4879 47.9137 20.7282 47.4762 20.9006C47.042 21.0696 46.5465 21.1541 45.9897 21.1541ZM53.774 21.1491C53.1575 21.1491 52.6073 20.9917 52.1234 20.6768C51.6428 20.3587 51.265 19.9062 50.9899 19.3196C50.7181 18.7296 50.5822 18.022 50.5822 17.1967C50.5822 16.3714 50.7198 15.6655 50.9949 15.0788C51.2733 14.4922 51.6544 14.0431 52.1383 13.7315C52.6222 13.42 53.1708 13.2642 53.7839 13.2642C54.2579 13.2642 54.639 13.3438 54.9274 13.5028C55.219 13.6586 55.4444 13.8409 55.6035 14.0497C55.7659 14.2585 55.8919 14.4425 55.9814 14.6016H56.0708V10.8182H57.5574V21H56.1056V19.8118H55.9814C55.8919 19.9742 55.7626 20.1598 55.5936 20.3686C55.4279 20.5774 55.1992 20.7597 54.9075 20.9155C54.6158 21.0713 54.238 21.1491 53.774 21.1491ZM54.1021 19.8814C54.5297 19.8814 54.8909 19.7687 55.1859 19.5433C55.4842 19.3146 55.7096 18.9981 55.862 18.5938C56.0178 18.1894 56.0957 17.7187 56.0957 17.1818C56.0957 16.6515 56.0195 16.1875 55.867 15.7898C55.7145 15.392 55.4908 15.0821 55.1958 14.8601C54.9009 14.638 54.5363 14.527 54.1021 14.527C53.6547 14.527 53.2818 14.643 52.9835 14.875C52.6852 15.107 52.4598 15.4235 52.3074 15.8246C52.1582 16.2256 52.0836 16.678 52.0836 17.1818C52.0836 17.6922 52.1599 18.1513 52.3123 18.5589C52.4648 18.9666 52.6902 19.2898 52.9885 19.5284C53.2901 19.7637 53.6613 19.8814 54.1021 19.8814ZM63.5034 21V10.8182H67.2321C67.9546 10.8182 68.5529 10.9375 69.0268 11.1761C69.5008 11.4115 69.8554 11.7313 70.0907 12.1357C70.3261 12.5367 70.4437 12.9891 70.4437 13.4929C70.4437 13.9171 70.3658 14.2751 70.21 14.5668C70.0543 14.8551 69.8455 15.0871 69.5836 15.2628C69.3251 15.4351 69.0401 15.5611 68.7285 15.6406V15.7401C69.0666 15.7566 69.3964 15.866 69.7179 16.0682C70.0427 16.267 70.3111 16.5504 70.5233 16.9183C70.7354 17.2862 70.8414 17.7337 70.8414 18.2607C70.8414 18.781 70.7188 19.2483 70.4735 19.6626C70.2316 20.0736 69.8571 20.4001 69.35 20.642C68.8429 20.8807 68.1949 21 67.4061 21H63.5034ZM65.0396 19.6825H67.2569C67.9927 19.6825 68.5197 19.54 68.8379 19.255C69.1561 18.9699 69.3152 18.6136 69.3152 18.1861C69.3152 17.8646 69.234 17.5696 69.0716 17.3011C68.9092 17.0327 68.6771 16.8189 68.3755 16.6598C68.0772 16.5007 67.7226 16.4212 67.3116 16.4212H65.0396V19.6825ZM65.0396 15.223H67.0978C67.4425 15.223 67.7524 15.1567 68.0275 15.0241C68.3059 14.8916 68.5263 14.706 68.6887 14.4673C68.8545 14.2254 68.9373 13.9403 68.9373 13.6122C68.9373 13.1913 68.7898 12.8383 68.4949 12.5533C68.1999 12.2682 67.7475 12.1257 67.1376 12.1257H65.0396V15.223ZM73.4838 23.8636C73.2618 23.8636 73.0596 23.8454 72.8773 23.8089C72.695 23.7758 72.5591 23.7393 72.4696 23.6996L72.8276 22.4815C73.0994 22.5545 73.3413 22.5859 73.5534 22.576C73.7656 22.5661 73.9528 22.4865 74.1152 22.3374C74.281 22.1882 74.4268 21.9446 74.5527 21.6065L74.7367 21.0994L71.9426 13.3636H73.5336L75.4675 19.2898H75.5471L77.481 13.3636H79.0769L75.9299 22.0192C75.784 22.4169 75.5984 22.7533 75.373 23.0284C75.1477 23.3068 74.8792 23.5156 74.5676 23.6548C74.2561 23.794 73.8948 23.8636 73.4838 23.8636ZM85.1584 21H83.5277L87.1918 10.8182H88.9666L92.6307 21H91L88.1214 12.6676H88.0419L85.1584 21ZM85.4318 17.0128H90.7216V18.3054H85.4318V17.0128ZM95.4682 10.8182V21H93.9817V10.8182H95.4682ZM98.9545 10.8182V21H97.468V10.8182H98.9545ZM104.246 21.1541C103.493 21.1541 102.845 20.9934 102.302 20.6719C101.761 20.3471 101.344 19.8913 101.049 19.3047C100.757 18.7147 100.611 18.0237 100.611 17.2315C100.611 16.4493 100.757 15.7599 101.049 15.1634C101.344 14.5668 101.755 14.1011 102.282 13.7663C102.812 13.4316 103.432 13.2642 104.141 13.2642C104.572 13.2642 104.99 13.3355 105.394 13.478C105.798 13.6205 106.161 13.8442 106.483 14.1491C106.804 14.4541 107.058 14.8501 107.243 15.3374C107.429 15.8213 107.522 16.4096 107.522 17.1023V17.6293H101.452V16.5156H106.065C106.065 16.1245 105.986 15.7782 105.827 15.4766C105.667 15.1716 105.444 14.9313 105.155 14.7557C104.87 14.58 104.536 14.4922 104.151 14.4922C103.733 14.4922 103.369 14.5949 103.057 14.8004C102.749 15.0026 102.51 15.2678 102.341 15.5959C102.176 15.9207 102.093 16.2737 102.093 16.6548V17.5249C102.093 18.0353 102.182 18.4695 102.361 18.8274C102.544 19.1854 102.797 19.4588 103.122 19.6477C103.447 19.8333 103.826 19.9261 104.26 19.9261C104.542 19.9261 104.799 19.8864 105.031 19.8068C105.263 19.724 105.464 19.6013 105.633 19.4389C105.802 19.2765 105.931 19.076 106.02 18.8374L107.427 19.0909C107.315 19.5052 107.113 19.8681 106.821 20.1797C106.532 20.4879 106.17 20.7282 105.732 20.9006C105.298 21.0696 104.802 21.1541 104.246 21.1541ZM112.373 24.0227C111.766 24.0227 111.244 23.9432 110.807 23.7841C110.373 23.625 110.018 23.4145 109.743 23.1527C109.468 22.8909 109.262 22.6042 109.126 22.2926L110.404 21.7656C110.494 21.9115 110.613 22.0656 110.762 22.228C110.915 22.3937 111.12 22.5346 111.379 22.6506C111.64 22.7666 111.977 22.8246 112.388 22.8246C112.951 22.8246 113.417 22.687 113.785 22.4119C114.153 22.1402 114.337 21.706 114.337 21.1094V19.608H114.242C114.153 19.7704 114.023 19.951 113.854 20.1499C113.689 20.3487 113.46 20.5211 113.168 20.6669C112.877 20.8127 112.497 20.8857 112.03 20.8857C111.427 20.8857 110.883 20.7448 110.399 20.4631C109.919 20.178 109.537 19.7588 109.256 19.2053C108.977 18.6484 108.838 17.964 108.838 17.152C108.838 16.34 108.976 15.6439 109.251 15.0639C109.529 14.4839 109.91 14.0398 110.394 13.7315C110.878 13.42 111.427 13.2642 112.04 13.2642C112.514 13.2642 112.897 13.3438 113.188 13.5028C113.48 13.6586 113.707 13.8409 113.869 14.0497C114.035 14.2585 114.163 14.4425 114.252 14.6016H114.362V13.3636H115.818V21.169C115.818 21.8253 115.666 22.3639 115.361 22.7848C115.056 23.2057 114.643 23.5173 114.123 23.7195C113.606 23.9216 113.022 24.0227 112.373 24.0227ZM112.358 19.6527C112.786 19.6527 113.147 19.5533 113.442 19.3544C113.74 19.1522 113.965 18.8639 114.118 18.4893C114.274 18.1115 114.352 17.6591 114.352 17.1321C114.352 16.6184 114.275 16.166 114.123 15.7749C113.97 15.3838 113.747 15.0788 113.452 14.8601C113.157 14.638 112.792 14.527 112.358 14.527C111.911 14.527 111.538 14.643 111.239 14.875C110.941 15.1037 110.716 15.4152 110.563 15.8097C110.414 16.2041 110.339 16.6449 110.339 17.1321C110.339 17.6326 110.416 18.0717 110.568 18.4496C110.721 18.8274 110.946 19.1224 111.244 19.3345C111.546 19.5466 111.917 19.6527 112.358 19.6527ZM117.812 21V13.3636H119.249V14.5767H119.328C119.467 14.1657 119.713 13.8426 120.064 13.6072C120.419 13.3686 120.82 13.2493 121.267 13.2493C121.36 13.2493 121.469 13.2526 121.595 13.2592C121.724 13.2659 121.826 13.2741 121.898 13.2841V14.706C121.839 14.6894 121.733 14.6712 121.58 14.6513C121.428 14.6281 121.275 14.6165 121.123 14.6165C120.772 14.6165 120.458 14.6911 120.183 14.8402C119.911 14.986 119.696 15.1899 119.537 15.4517C119.378 15.7102 119.298 16.0052 119.298 16.3366V21H117.812ZM126.128 21.1541C125.412 21.1541 124.787 20.9901 124.254 20.6619C123.72 20.3338 123.306 19.8748 123.011 19.2848C122.716 18.6948 122.568 18.0054 122.568 17.2166C122.568 16.4245 122.716 15.7318 123.011 15.1385C123.306 14.5452 123.72 14.0845 124.254 13.7564C124.787 13.4283 125.412 13.2642 126.128 13.2642C126.844 13.2642 127.469 13.4283 128.002 13.7564C128.536 14.0845 128.95 14.5452 129.245 15.1385C129.54 15.7318 129.688 16.4245 129.688 17.2166C129.688 18.0054 129.54 18.6948 129.245 19.2848C128.95 19.8748 128.536 20.3338 128.002 20.6619C127.469 20.9901 126.844 21.1541 126.128 21.1541ZM126.133 19.9062C126.597 19.9062 126.981 19.7836 127.286 19.5384C127.591 19.2931 127.817 18.9666 127.963 18.5589C128.112 18.1513 128.186 17.7022 128.186 17.2116C128.186 16.7244 128.112 16.277 127.963 15.8693C127.817 15.4583 127.591 15.1286 127.286 14.88C126.981 14.6314 126.597 14.5071 126.133 14.5071C125.666 14.5071 125.278 14.6314 124.97 14.88C124.665 15.1286 124.438 15.4583 124.289 15.8693C124.143 16.277 124.07 16.7244 124.07 17.2116C124.07 17.7022 124.143 18.1513 124.289 18.5589C124.438 18.9666 124.665 19.2931 124.97 19.5384C125.278 19.7836 125.666 19.9062 126.133 19.9062ZM143.628 14.1293H142.077C142.017 13.7978 141.906 13.5062 141.744 13.2543C141.581 13.0024 141.383 12.7886 141.147 12.6129C140.912 12.4373 140.648 12.3047 140.357 12.2152C140.068 12.1257 139.762 12.081 139.437 12.081C138.85 12.081 138.325 12.2285 137.861 12.5234C137.4 12.8184 137.036 13.2509 136.767 13.821C136.502 14.3911 136.369 15.0871 136.369 15.9091C136.369 16.7377 136.502 17.437 136.767 18.0071C137.036 18.5772 137.402 19.008 137.866 19.2997C138.33 19.5914 138.852 19.7372 139.432 19.7372C139.753 19.7372 140.058 19.6941 140.347 19.608C140.638 19.5185 140.902 19.3875 141.137 19.2152C141.373 19.0429 141.571 18.8324 141.734 18.5838C141.9 18.3319 142.014 18.0436 142.077 17.7188L143.628 17.7237C143.545 18.2242 143.384 18.6849 143.146 19.1058C142.91 19.5234 142.607 19.8847 142.236 20.1896C141.868 20.4912 141.447 20.7249 140.973 20.8906C140.499 21.0563 139.982 21.1392 139.422 21.1392C138.54 21.1392 137.755 20.9304 137.066 20.5128C136.376 20.0919 135.833 19.4903 135.435 18.7081C135.04 17.9259 134.843 16.9929 134.843 15.9091C134.843 14.822 135.042 13.889 135.44 13.1101C135.838 12.3279 136.381 11.728 137.07 11.3104C137.76 10.8894 138.544 10.679 139.422 10.679C139.962 10.679 140.466 10.7569 140.933 10.9126C141.404 11.0651 141.827 11.2905 142.201 11.5888C142.576 11.8838 142.886 12.245 143.131 12.6726C143.376 13.0968 143.542 13.5824 143.628 14.1293ZM146.833 10.8182V21H145.347V10.8182H146.833ZM152.05 21.1541C151.334 21.1541 150.709 20.9901 150.176 20.6619C149.642 20.3338 149.228 19.8748 148.933 19.2848C148.638 18.6948 148.49 18.0054 148.49 17.2166C148.49 16.4245 148.638 15.7318 148.933 15.1385C149.228 14.5452 149.642 14.0845 150.176 13.7564C150.709 13.4283 151.334 13.2642 152.05 13.2642C152.766 13.2642 153.391 13.4283 153.924 13.7564C154.458 14.0845 154.872 14.5452 155.167 15.1385C155.462 15.7318 155.61 16.4245 155.61 17.2166C155.61 18.0054 155.462 18.6948 155.167 19.2848C154.872 19.8748 154.458 20.3338 153.924 20.6619C153.391 20.9901 152.766 21.1541 152.05 21.1541ZM152.055 19.9062C152.519 19.9062 152.903 19.7836 153.208 19.5384C153.513 19.2931 153.739 18.9666 153.884 18.5589C154.034 18.1513 154.108 17.7022 154.108 17.2116C154.108 16.7244 154.034 16.277 153.884 15.8693C153.739 15.4583 153.513 15.1286 153.208 14.88C152.903 14.6314 152.519 14.5071 152.055 14.5071C151.588 14.5071 151.2 14.6314 150.892 14.88C150.587 15.1286 150.36 15.4583 150.21 15.8693C150.065 16.277 149.992 16.7244 149.992 17.2116C149.992 17.7022 150.065 18.1513 150.21 18.5589C150.36 18.9666 150.587 19.2931 150.892 19.5384C151.2 19.7836 151.588 19.9062 152.055 19.9062ZM162.106 17.8331V13.3636H163.598V21H162.136V19.6776H162.056C161.881 20.0852 161.599 20.425 161.211 20.6967C160.827 20.9652 160.348 21.0994 159.775 21.0994C159.284 21.0994 158.85 20.9917 158.472 20.7763C158.097 20.5575 157.802 20.2344 157.587 19.8068C157.375 19.3793 157.269 18.8506 157.269 18.2209V13.3636H158.755V18.0419C158.755 18.5623 158.9 18.9766 159.188 19.2848C159.476 19.593 159.851 19.7472 160.311 19.7472C160.59 19.7472 160.867 19.6776 161.142 19.5384C161.42 19.3991 161.65 19.1887 161.833 18.907C162.018 18.6252 162.109 18.2673 162.106 17.8331ZM168.454 21.1491C167.837 21.1491 167.287 20.9917 166.803 20.6768C166.323 20.3587 165.945 19.9062 165.67 19.3196C165.398 18.7296 165.262 18.022 165.262 17.1967C165.262 16.3714 165.399 15.6655 165.675 15.0788C165.953 14.4922 166.334 14.0431 166.818 13.7315C167.302 13.42 167.85 13.2642 168.464 13.2642C168.938 13.2642 169.319 13.3438 169.607 13.5028C169.899 13.6586 170.124 13.8409 170.283 14.0497C170.446 14.2585 170.572 14.4425 170.661 14.6016H170.751V10.8182H172.237V21H170.785V19.8118H170.661C170.572 19.9742 170.442 20.1598 170.273 20.3686C170.108 20.5774 169.879 20.7597 169.587 20.9155C169.296 21.0713 168.918 21.1491 168.454 21.1491ZM168.782 19.8814C169.209 19.8814 169.571 19.7687 169.866 19.5433C170.164 19.3146 170.389 18.9981 170.542 18.5938C170.698 18.1894 170.775 17.7187 170.775 17.1818C170.775 16.6515 170.699 16.1875 170.547 15.7898C170.394 15.392 170.171 15.0821 169.876 14.8601C169.581 14.638 169.216 14.527 168.782 14.527C168.334 14.527 167.961 14.643 167.663 14.875C167.365 15.107 167.14 15.4235 166.987 15.8246C166.838 16.2256 166.763 16.678 166.763 17.1818C166.763 17.6922 166.84 18.1513 166.992 18.5589C167.144 18.9666 167.37 19.2898 167.668 19.5284C167.97 19.7637 168.341 19.8814 168.782 19.8814Z" fill="#888594"/>
<path d="M204 4L192 28" stroke="#34323E" stroke-width="2" stroke-linecap="round"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M246.349 7.13008C246.919 7.37008 247.289 7.93008 247.289 8.56008H247.299V17.8401V23.4401C247.299 24.3001 246.599 25.0001 245.739 25.0001H235.039H223.479C222.869 25.0001 222.329 24.6401 222.109 24.0801C221.889 23.5101 222.019 22.8801 222.459 22.4601L234.009 11.3701C234.439 10.9601 235.069 10.8501 235.609 11.0801C236.159 11.3101 236.509 11.8501 236.509 12.4401V15.2401L244.659 7.43008C245.109 7.00008 245.769 6.88008 246.349 7.13008ZM234.039 22.5301V14.7801L225.959 22.5301H228.939C228.989 22.4601 229.049 22.3901 229.119 22.3201L231.719 19.8301C232.219 19.3601 232.999 19.3801 233.469 19.8701C233.939 20.3601 233.919 21.1501 233.429 21.6201L232.479 22.5301H234.039ZM236.509 22.5301H244.819V17.8401V10.7001L236.509 18.6701V22.5301ZM330.309 10.4297C326.619 10.4297 323.619 13.4297 323.619 17.1297C323.619 20.8197 326.619 23.8297 330.309 23.8297C333.999 23.8297 336.999 20.8297 336.999 17.1297C336.999 13.4397 333.999 10.4297 330.309 10.4297ZM330.309 20.3597C328.529 20.3597 327.079 18.9097 327.079 17.1297C327.079 15.3497 328.529 13.8997 330.309 13.8997C332.089 13.8997 333.539 15.3497 333.539 17.1297C333.539 18.9097 332.089 20.3597 330.309 20.3597ZM266.318 10.4805H270.058V20.3205H274.888V23.5405H266.318V10.4805ZM276.539 10.4805H280.279V20.3205H285.109V23.5405H276.539V10.4805ZM290.51 18.4805H294.88V15.3705H290.51V13.7205H295.28V10.4805H286.77V23.5405H295.39V20.3205H290.51V18.4805ZM317.429 10.4902C320.749 10.4902 322.479 11.7502 322.479 14.8502C322.479 16.9502 321.789 18.1802 320.209 18.7602L323.709 23.5402H319.289L316.599 19.1602H315.869V23.5402H312.129V10.4902H317.429ZM315.869 16.4802H316.769C318.289 16.4802 318.799 16.0702 318.799 14.8402C318.799 13.6402 318.289 13.3402 316.769 13.3402H315.869V16.4802ZM306.158 19.1004H303.598V16.5804H310.288V17.1404C310.288 17.8304 310.178 18.4904 309.988 19.1104C309.148 21.8504 306.598 23.8404 303.598 23.8404C299.908 23.8404 296.908 20.8304 296.908 17.1404C296.908 13.4504 299.908 10.4404 303.598 10.4404C304.968 10.4404 306.288 10.8504 307.418 11.6404L305.438 14.4804C304.898 14.1004 304.258 13.9004 303.598 13.9004C301.818 13.9004 300.368 15.3504 300.368 17.1304C300.368 18.9104 301.818 20.3604 303.598 20.3604C304.638 20.3604 305.568 19.8704 306.158 19.1004ZM256.028 10.4404L249.918 23.5404H253.618L254.468 21.7004H260.238L261.098 23.5404H264.798L258.638 10.4404H256.028ZM255.918 18.5704L257.368 15.4704L258.798 18.5704H255.918Z" fill="white"/>
</svg>

        </div>
      </div>      </div>
      <div style={{display:'grid',alignItems:'center',justifyItems:'center',color:'#252525',marginTop:'280px',fontSize:'30px',fontWeight:'300'}}>
      Press &quot/&quot to send message to other users.
      

      </div>
      </main>
    </>
  );
}

import QRCode from 'qrcode';

export const genQRcode = async (url) => {
    const QRcode = await QRCode.toDataURL(`http://www.dhmlabs.com${url}`);
    return QRcode;
}
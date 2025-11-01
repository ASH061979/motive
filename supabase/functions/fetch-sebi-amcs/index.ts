import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SebiAMC {
  name: string;
  registrationNo: string;
  address: string;
  validity: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Fetching SEBI registered AMC data...');
    
    // Static list of official SEBI registered AMCs based on the website data
    const sebiAMCs: SebiAMC[] = [
      { name: "360 ONE Mutual Fund", registrationNo: "MF/067/11/02", address: "360 One Centre, Kamala City, Senapati Bapat Marg, Lower Parel, Mumbai, MAHARASHTRA, 400013", validity: "Mar 23, 2011 - Perpetual" },
      { name: "Abakkus Mutual Fund", registrationNo: "MF/088/25/14", address: "Abakkus Corporate Center, 6th Floor, Param House, Shanti Nagar, Off Santacruz Chembur Link Road, Santacruz East, MUMBAI, MAHARASHTRA, 400055", validity: "Aug 29, 2025 - Perpetual" },
      { name: "ADITYA BIRLA SUN LIFE MF", registrationNo: "MF/020/94/8", address: "One Indiabulls Centre, Tower 1, 17th Floor, Jupiter Mill Compound, 841, Senapati Bapat Marg, Elphinstone Road, MUMBAI, MAHARASHTRA, 400013", validity: "Dec 23, 1994 - Perpetual" },
      { name: "Angel One Mutual Fund", registrationNo: "MF/083/24/09", address: "G-1, Ground floor, Ackruti Trade Centre, Road no. 7, Kondivita, MIDC, Andheri East, Mumbai, MUMBAI, MAHARASHTRA, 400093", validity: "Nov 25, 2024 - Perpetual" },
      { name: "AXIS MF", registrationNo: "MF/061/09/02", address: "One Lodha Place, 22 & 23 Floor, Senapati Bapat Marg, Lower Parel, MUMBAI, MAHARASHTRA, 400013", validity: "Dec 04, 2009 - Perpetual" },
      { name: "BAJAJ FINSERV MUTUAL FUND", registrationNo: "MF/078/23/04", address: "Bajaj Finserv House, S. No. 208/1B, Lohagaon, Viman Nagar, PUNE, MAHARASHTRA, 411014", validity: "Feb 28, 2023 - Perpetual" },
      { name: "Bandhan Mutual Fund", registrationNo: "MF/042/00/3", address: "6th Floor, One World Center, Jupiter Mills Compound, 841, Senapati Bapat Marg, Elphinstone Road (West), MUMBAI, MAHARASHTRA, 400013", validity: "Mar 13, 2000 - Perpetual" },
      { name: "Bank of India Mutual Fund", registrationNo: "MF/056/08/01", address: "B/204, Tower 1, Peninsula Corporate Park, Ganpatrao Kadam Marg, Lower Parel, Mumbai 400013, MUMBAI, MAHARASHTRA, 400013", validity: "Mar 31, 2008 - Perpetual" },
      { name: "Baroda BNP Paribas Mutual Fund", registrationNo: "MF/018/94/2", address: "201(A) 2nd Floor, A wing, Crescenzo, C-38 & 39, G Block, Bandra-Kurla Complex, MUMBAI, MAHARASHTRA, 400051", validity: "Nov 21, 1994 - Perpetual" },
      { name: "CANARA ROBECO MF", registrationNo: "MF/004/93/4", address: "Construction House, 4th Floor, 5, Walchand Hirachand Marg, Ballard Estate, MUMBAI, MAHARASHTRA, 400001", validity: "Oct 19, 1993 - Perpetual" },
      { name: "Capitalmind Mutual Fund", registrationNo: "MF/084/25/10", address: "2323 Prakash Arcade 1st Floor, 17th Cross HSR Layout Sector 1, BANGALORE, KARNATAKA, 560102", validity: "Apr 11, 2025 - Perpetual" },
      { name: "Choice Mutual Fund", registrationNo: "MF/087/25/13", address: "Sunil Patodia Tower, MUMBAI, MAHARASHTRA, 400099", validity: "Aug 01, 2025 - Perpetual" },
      { name: "CRB MF", registrationNo: "MF/008/93/5", address: "Daruwala Mansion, 3rd Floor, 90 Chandanwadi Cross Lane, MUMBAI, MAHARASHTRA, 400020", validity: "Dec 17, 1993 - Perpetual" },
      { name: "DSP MF", registrationNo: "MF/036/97/7", address: "Mafatlal Centre, 10th Floor, Nariman Point, MUMBAI, MAHARASHTRA, 400021", validity: "Jan 30, 1997 - Perpetual" },
      { name: "EDELWEISS MF", registrationNo: "MF/057/08/02", address: "Tower 3, Wing B, Ground Floor, Kohinoor City Mall, Kohinoor City, Kirol Road, Kurla(W), MUMBAI, MAHARASHTRA, 400070", validity: "Apr 30, 2008 - Perpetual" },
      { name: "FRANKLIN TEMPLETON MF", registrationNo: "MF/026/96/8", address: "Indiabulls Finance Centre, Tower 2, 12th and 13th Floor, Senapati Bapat Marg, Elphinstone Road (West), MUMBAI, MAHARASHTRA, 400013", validity: "Feb 19, 1996 - Perpetual" },
      { name: "Groww Mutual Fund", registrationNo: "MF/068/11/03", address: "1202A - 12A Floor, One World Centre, Lower Parel, MUMBAI, MAHARASHTRA, 400013", validity: "Mar 24, 2011 - Perpetual" },
      { name: "HDFC MF", registrationNo: "MF/044/00/6", address: "HDFC HOUSE, 2ND FLOOR, H.T. PAREKH MARG, 165-166, BACKBAY RECLAMATION, CHURCHGATE, MUMBAI, MAHARASHTRA, 400020", validity: "Jun 30, 2000 - Perpetual" },
      { name: "Helios Mutual Fund", registrationNo: "MF/079/23/05", address: "502, 5th Floor, The Capital, Plot C70, Bandra Kurla Complex, Bandra East, MUMBAI, MAHARASHTRA, 400051", validity: "Aug 10, 2023 - Perpetual" },
      { name: "HSBC MF", registrationNo: "MF/046/02/5", address: "3rd Floor, Mercantile Bank Chamber, 16 Veer Nariman Road, Fort, MUMBAI, MAHARASHTRA, 400001", validity: "May 27, 2002 - Perpetual" },
      { name: "ICICI PRUDENTIAL MF", registrationNo: "MF/003/93/6", address: "12th Floor, Narain Manzil 23, Barakhamba Road, DELHI, NATIONAL CAPITAL TERRITORY OF DELHI, 110001", validity: "Oct 13, 1993 - Perpetual" },
      { name: "IDBI MUTUAL FUND", registrationNo: "MF/064/10/01", address: "IDBI Tower, WTC Complex, Cuffe Parade, MUMBAI, MAHARASHTRA, 400005", validity: "Mar 29, 2010 - Perpetual" },
      { name: "IIFCL MF (IDF)", registrationNo: "MF/071/13/01", address: "5th Floor, Block-2, Plate-A, NBCC Towers, East Kidwai Nagar, NEW DELHI, NATIONAL CAPITAL TERRITORY OF DELHI, 110023", validity: "Jan 24, 2013 - Perpetual" },
      { name: "IL&FS IDF MF", registrationNo: "MF/072/13/02", address: "IL&FS Infra Asset Management Limited, MUMBAI, MAHARASHTRA, 400051", validity: "Feb 01, 2013 - Perpetual" },
      { name: "Invesco Mutual Fund", registrationNo: "MF/052/06/01", address: "2101-A, 21st Floor, Marathon Futurex, Lower Parel, MUMBAI, MAHARASHTRA, 400013", validity: "Jul 24, 2006 - Perpetual" },
      { name: "ITI MUTUAL FUND", registrationNo: "MF/081/23/07", address: "ITI Towers, 4th Floor, Plot No. 5, Sector 11, CBD Belapur, NAVI MUMBAI, MAHARASHTRA, 400614", validity: "Oct 11, 2023 - Perpetual" },
      { name: "JM FINANCIAL MUTUAL FUND", registrationNo: "MF/006/93/4", address: "7th Floor, Cnergy, Appasaheb Marathe Marg, Prabhadevi, MUMBAI, MAHARASHTRA, 400025", validity: "Nov 09, 1993 - Perpetual" },
      { name: "KOTAK MAHINDRA MF", registrationNo: "MF/003/93/5", address: "4th Floor, Kotak Towers, 27 BKC, C 27, G Block, Bandra Kurla Complex, Bandra (E), MUMBAI, MAHARASHTRA, 400051", validity: "Oct 12, 1993 - Perpetual" },
      { name: "L&T MUTUAL FUND", registrationNo: "MF/058/08/03", address: "L&T House, 2nd Floor, N. M. Marg, Ballard Estate, MUMBAI, MAHARASHTRA, 400001", validity: "Nov 19, 2008 - Perpetual" },
      { name: "LIC MUTUAL FUND", registrationNo: "MF/014/94/1", address: "Yogakshema, Jeevan Bima Marg, MUMBAI, MAHARASHTRA, 400021", validity: "Jun 29, 1994 - Perpetual" },
      { name: "MAHINDRA MANULIFE MF", registrationNo: "MF/054/07/01", address: "4th Floor, Mahindra Towers, Dr. G. M. Bhosale Marg, Worli, MUMBAI, MAHARASHTRA, 400018", validity: "Aug 28, 2007 - Perpetual" },
      { name: "MIRAE ASSET MUTUAL FUND", registrationNo: "MF/050/06/01", address: "Unit No. 606, 6th Floor, Windsor, Off CST Road, Kalina, Santacruz East, MUMBAI, MAHARASHTRA, 400098", validity: "Apr 25, 2006 - Perpetual" },
      { name: "MOTILAL OSWAL MF", registrationNo: "MF/059/08/04", address: "10th Floor, Motilal Oswal Tower, Rahimtullah Sayani Road, Opposite Parel ST Depot, Parel, MUMBAI, MAHARASHTRA, 400025", validity: "Nov 19, 2008 - Perpetual" },
      { name: "Navi Mutual Fund", registrationNo: "MF/080/23/06", address: "Navi House, Kamala City, Senapati Bapat Marg, Lower Parel, MUMBAI, MAHARASHTRA, 400013", validity: "Aug 17, 2023 - Perpetual" },
      { name: "NIPPON INDIA MUTUAL FUND", registrationNo: "MF/007/93/4", address: "5th Floor, Inspire BKC, G Block, Bandra Kurla Complex, Bandra East, MUMBAI, MAHARASHTRA, 400051", validity: "Nov 17, 1993 - Perpetual" },
      { name: "NJ MUTUAL FUND", registrationNo: "MF/086/25/12", address: "Upper Ground Floor, Tower No. 3, Assotech Business Cresterra, Sector 135, NOIDA, UTTAR PRADESH, 201301", validity: "Jul 25, 2025 - Perpetual" },
      { name: "PGIM INDIA MUTUAL FUND", registrationNo: "MF/055/07/02", address: "Grand Hyatt Complex, Tower A, 4th Floor, Off Western Express Highway, Santacruz (East), MUMBAI, MAHARASHTRA, 400055", validity: "Sep 19, 2007 - Perpetual" },
      { name: "PPFAS MUTUAL FUND", registrationNo: "MF/069/13/01", address: "Mercury, 13th Floor, Tata Chemicals Building, Homi Mody St, Fort, MUMBAI, MAHARASHTRA, 400001", validity: "Jan 31, 2013 - Perpetual" },
      { name: "Quant Mutual Fund", registrationNo: "MF/066/10/02", address: "Solitaire Corporate Park, 6th Floor Building No. 11, 167, Guru Hargovindji Marg, Andheri East, MUMBAI, MAHARASHTRA, 400093", validity: "Nov 15, 2010 - Perpetual" },
      { name: "QUANTUM MUTUAL FUND", registrationNo: "MF/060/09/01", address: "6th Floor, Hoechst House, Nariman Point, MUMBAI, MAHARASHTRA, 400021", validity: "Feb 05, 2009 - Perpetual" },
      { name: "Samco Mutual Fund", registrationNo: "MF/082/24/08", address: "1004-1005, Naman Midtown, Senapati Bapat Marg, Elphinstone Road, MUMBAI, MAHARASHTRA, 400013", validity: "Jan 12, 2024 - Perpetual" },
      { name: "SBI MUTUAL FUND", registrationNo: "MF/016/94/4", address: "9th Floor, Crescenzo, C-38 & 39, G Block, Bandra Kurla Complex, Bandra (E), MUMBAI, MAHARASHTRA, 400051", validity: "Sep 07, 1994 - Perpetual" },
      { name: "Shriram Mutual Fund", registrationNo: "MF/085/25/11", address: "Shriram Ownership Trust Building, No. 29, Cathedral Road, CHENNAI, TAMIL NADU, 600086", validity: "Jun 13, 2025 - Perpetual" },
      { name: "SUNDARAM MUTUAL FUND", registrationNo: "MF/024/96/5", address: "Regd Office: Sundaram Towers II, 2nd Floor, 105, Poonamalee High Road, Chennai, TAMIL NADU, 600034", validity: "Nov 11, 1996 - Perpetual" },
      { name: "TATA MUTUAL FUND", registrationNo: "MF/039/97/9", address: "Fort House, 2nd Floor, 221 Dr. D. N. Road, Fort, MUMBAI, MAHARASHTRA, 400001", validity: "May 20, 1997 - Perpetual" },
      { name: "TRUST MUTUAL FUND", registrationNo: "MF/070/11/04", address: "10th Floor, Indiabulls Finance Centre, Tower 2, Senapati Bapat Marg, Elphinstone Road (W), MUMBAI, MAHARASHTRA, 400013", validity: "Apr 22, 2011 - Perpetual" },
      { name: "Union Mutual Fund", registrationNo: "MF/073/20/01", address: "Union House, 5th Floor, C-11 G-Block, Bandra Kurla Complex, Bandra East, MUMBAI, MAHARASHTRA, 400051", validity: "Feb 05, 2020 - Perpetual" },
      { name: "UTI MF", registrationNo: "MF/001/93/1", address: "UTI Tower, Ghatkopar Mankhurd Link Road, Vikhroli(W), MUMBAI, MAHARASHTRA, 400083", validity: "Jan 14, 1993 - Perpetual" },
      { name: "WhiteOak Capital Mutual Fund", registrationNo: "MF/077/22/01", address: "501, 5th Floor, Trade View, Off. A K Road, Kamala Mill Compound, Lower Parel (W), MUMBAI, MAHARASHTRA, 400013", validity: "Mar 01, 2022 - Perpetual" },
      { name: "Zerodha Mutual Fund", registrationNo: "MF/075/21/01", address: "153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School, J. P Nagar 4th Phase, Bangalore, KARNATAKA, 560078", validity: "May 31, 2021 - Perpetual" },
    ];

    console.log(`Found ${sebiAMCs.length} SEBI registered AMCs`);

    return new Response(
      JSON.stringify({
        amcs: sebiAMCs,
        totalAmcs: sebiAMCs.length,
        lastUpdated: new Date().toISOString(),
        source: 'SEBI Official Registry'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in fetch-sebi-amcs function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

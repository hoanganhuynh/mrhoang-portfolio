export type Paper = {
  title: string;
  authors: string;
  journal: string;
  year: string | number;
};

export type ConferencePaper = {
  title: string;
  authors: string;
  event: string;
  year: string;
};

export type Book = {
  title: string;
  type: string;
  role: string;
  publisher: string;
  year: number;
};

export type Award = {
  rank: string;
  organization: string;
  topic: string;
};

export const internationalPapers: Paper[] = [
  {
    title: "The Role of Mental Health Literacy in Shaping Help-Seeking Behaviors among High School Students in Vietnam",
    authors: "Hoang Le Bao Nguyen, Son Van Huynh, Quan Hong Bui",
    journal: "Saudi Journal of Humanities and Social Sciences",
    year: 2024,
  },
  {
    title: "Factors influencing help-seeking behavior for mental health problems in high school students",
    authors: "Hoang Le Bao Nguyen, Son Van Huynh, Quan Hong Bui",
    journal: "Multidisciplinary Science Journal",
    year: 2024,
  },
];

export const domesticPapers: Paper[] = [
  {
    title: "Hành vi tìm kiếm sự trợ giúp về sức khoẻ tâm thần ở học sinh trung học phổ thông trong bối cảnh hậu Covid: Một nghiên cứu tổng thuật",
    authors: "Nguyễn Lê Bảo Hoàng, Huỳnh Văn Sơn, Bùi Hồng Quân",
    journal: "Tạp chí Khoa học Trường Đại học Sư phạm TP. Hồ Chí Minh",
    year: 2024,
  },
  {
    title: "Xây dựng các biện pháp cải thiện hành vi tìm kiếm sự trợ giúp về sức khoẻ tâm thần của học sinh trung học",
    authors: "Nguyễn Lê Bảo Hoàng, Huỳnh Văn Sơn, Bùi Hồng Quân",
    journal: "Tạp chí Khoa học Xã hội, Nhân văn và Giáo dục",
    year: 2025,
  },
  {
    title: "Mối liên hệ giữa mức độ stress, trầm cảm, lo âu và hành vi tìm kiếm sự trợ giúp của học sinh trung học phổ thông",
    authors: "Nguyễn Lê Bảo Hoàng",
    journal: "Tạp chí Thiết bị Giáo dục",
    year: 2024,
  },
  {
    title: "Một số yếu tố ảnh hưởng đến hành vi tìm kiếm sự trợ giúp về sức khoẻ tâm thần của học sinh trung học phổ thông",
    authors: "Nguyễn Lê Bảo Hoàng, Huỳnh Văn Sơn, Bùi Hồng Quân",
    journal: "Tạp chí Giáo dục",
    year: 2024,
  },
  {
    title: "Hành vi tìm kiếm sự trợ giúp về sức khoẻ tâm thần của học sinh trung học phổ thông",
    authors: "Nguyễn Lê Bảo Hoàng, Huỳnh Văn Sơn, Bùi Hồng Quân",
    journal: "Tạp chí Tâm lý học Việt Nam",
    year: 2024,
  },
  {
    title: "Sức khoẻ tâm thần của học sinh trung học phổ thông hậu Covid-19",
    authors: "Nguyễn Lê Bảo Hoàng, Huỳnh Văn Sơn, Bùi Hồng Quân",
    journal: "Tạp chí Nghiên cứu dân tộc",
    year: 2024,
  },
  {
    title: "Getting children ready for school: Familiarization with numerical symbols – An important content in mathematics education",
    authors: "Nguyễn Lê Bảo Hoàng, Giang Thiên Vũ, Mai Mỹ Hạnh, Trần Lương, Đỗ Tất Thiên",
    journal: "Tạp chí Khoa học Trường Đại học Sư phạm TP. Hồ Chí Minh, Tập 18, Số 11",
    year: 2021,
  },
  {
    title: "EEG machine and the neuro-science research in Vietnam",
    authors: "Huỳnh Văn Sơn, Giang Thiên Vũ, Đỗ Tất Thiên, Nguyễn Vĩnh Khương, Nguyễn Lê Bảo Hoàng",
    journal: "Tạp chí Khoa học Trường Đại học Sư phạm TP. Hồ Chí Minh",
    year: 2021,
  },
];

export const internationalConferences: ConferencePaper[] = [
  {
    title: "Factors affecting the development of school counselors in the Southern region of Vietnam – The management perspective",
    authors: "Van Son Huynh, Thien Vu Giang, Bao Hoang Nguyen Le, Thien Vu Nguyen An",
    event: "International Conference on Educational Innovation (Taiwan)",
    year: "11/2019",
  },
];

export const domesticConferences: ConferencePaper[] = [
  {
    title: "Nghiên cứu về hành vi tự cô lập – Hướng nghiên cứu cần quan tâm ở học đường",
    authors: "Nguyễn Lê Bảo Hoàng, Giang Thiên Vũ, Đỗ Tất Thiên",
    event: "Hội thảo khoa học quốc tế Tâm lý học học đường lần thứ 6 – Vai trò của Tâm lí học trường học trong việc đảm bảo sức khỏe tâm lí cho học sinh và gia đình",
    year: "2018",
  },
  {
    title: "Khởi nghiệp từ đề tài phòng tránh xâm hại tình dục trẻ em của sinh viên ngành tâm lý học",
    authors: "Giang Thiên Vũ, Nguyễn Lê Bảo Hoàng, Nguyễn Thanh Huân",
    event: "Hội thảo khởi nghiệp của sinh viên ngoài sư phạm",
    year: "2018",
  },
  {
    title: "Mô hình tham vấn học đường trường THCS và THPT Việt Anh",
    authors: "Mai Mỹ Hạnh, Giang Thiên Vũ, Nguyễn Lê Bảo Hoàng",
    event: "Hội thảo khoa học Phát triển mô hình tham vấn học đường ở trường phổ thông",
    year: "2017",
  },
];

export const books: Book[] = [
  {
    title: "Câu chuyện Đạo đức (Lớp 1)",
    type: "Sách tham khảo",
    role: "Tác giả (viết chung)",
    publisher: "NXB Đại học Sư phạm TP.HCM",
    year: 2022,
  },
  {
    title: "Thực hành Kỹ năng sống (Lớp 11)",
    type: "Sách giáo khoa",
    role: "Tác giả (viết chung)",
    publisher: "NXB Giáo dục Việt Nam",
    year: 2021,
  },
  {
    title: "Văn hoá Học đường (Lớp 4)",
    type: "Sách giáo khoa",
    role: "Tác giả (viết chung)",
    publisher: "NXB Giáo dục Việt Nam",
    year: 2021,
  },
  {
    title: "Sáng Tạo Với Màu Nước Và Giấy – Thực Hành Sáng Tạo Với Màu Nước (Tập 1 & 2)",
    type: "Sách tham khảo",
    role: "Tác giả (viết chung)",
    publisher: "NXB Đại học Sư phạm TP.HCM",
    year: 2017,
  },
  {
    title: "Kỹ Năng Phòng Tránh Xâm Hại Cho Trẻ Mầm Non",
    type: "Sách tham khảo",
    role: "Tác giả (viết chung)",
    publisher: "NXB Đại học Sư phạm TP.HCM",
    year: 2017,
  },
  {
    title: "Kỹ Năng Phòng Tránh Xâm Hại Cho Học Sinh Tiểu Học",
    type: "Sách tham khảo",
    role: "Tác giả (viết chung)",
    publisher: "NXB Đại học Sư phạm TP.HCM",
    year: 2017,
  },
];

export const awards: Award[] = [
  {
    rank: "Giải Ba",
    organization: "Hội thi sáng tạo kỹ thuật TP. Hồ Chí Minh năm 2015–2016",
    topic: "Thử nghiệm một số biện pháp nâng đỡ cảm xúc cho trẻ bị lạm dụng tình dục",
  },
  {
    rank: "Giải Ba",
    organization: "Giải thưởng Sinh viên Nghiên cứu Khoa học Eureka lần thứ 18 (2016)",
    topic: "Thử nghiệm một số biện pháp nâng đỡ cảm xúc cho trẻ bị lạm dụng tình dục",
  },
  {
    rank: "Giải Khuyến khích",
    organization: "Sinh viên Nghiên cứu khoa học 2016–2017, Trường Đại học Sư phạm TP.HCM",
    topic: "Vận dụng \"Năm điều Bác Hồ dạy\" vào xây dựng sách ảnh giáo dục đạo đức cho học sinh tiểu học",
  },
];

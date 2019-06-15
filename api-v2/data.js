const moment = require('moment')
const mongoose = require('mongoose')

const category1Id = mongoose.Types.ObjectId()
const category2Id = mongoose.Types.ObjectId()
const category3Id = mongoose.Types.ObjectId()
const category4Id = mongoose.Types.ObjectId()
const category5Id = mongoose.Types.ObjectId()

const tag1Id = mongoose.Types.ObjectId()
const tag2Id = mongoose.Types.ObjectId()
const tag3Id = mongoose.Types.ObjectId() 

const comment1Id = mongoose.Types.ObjectId()
const comment2Id = mongoose.Types.ObjectId()
const comment3Id = mongoose.Types.ObjectId()

const post1Id = mongoose.Types.ObjectId()
const post2Id = mongoose.Types.ObjectId()
const post3Id = mongoose.Types.ObjectId()
const post4Id = mongoose.Types.ObjectId()
const post5Id = mongoose.Types.ObjectId()
const post6Id = mongoose.Types.ObjectId()
const post7Id = mongoose.Types.ObjectId()
const post8Id = mongoose.Types.ObjectId()

const user1Id = mongoose.Types.ObjectId()
const user2Id = mongoose.Types.ObjectId()
const user3Id = mongoose.Types.ObjectId()
const user4Id = mongoose.Types.ObjectId()
const user5Id = mongoose.Types.ObjectId()
const user6Id = mongoose.Types.ObjectId()

// const guest1Id = mongoose.Types.ObjectId()
// const guest2Id = mongoose.Types.ObjectId()
// const guest3Id = mongoose.Types.ObjectId()

// const subscriber1Id = mongoose.Types.ObjectId()
// const subscriber2Id = mongoose.Types.ObjectId()
// const subscriber3Id = mongoose.Types.ObjectId()

// const editor1Id = mongoose.Types.ObjectId()
// const editor2Id = mongoose.Types.ObjectId()
// const editor3Id = mongoose.Types.ObjectId()

// const admin1Id = mongoose.Types.ObjectId()


module.exports = {
    //categories
    "categories": [
        {
            "_id": category1Id,
            "name": "Thể thao",
            "createdAt": moment().toISOString()
        },
        {
            "_id": category2Id,
            "name": "Giải trí",
            "createdAt": moment().toISOString()
        },
        {
            "_id": category3Id,
            "name": "Ẩm thực",
            "createdAt": moment().toISOString()
        },
        {
            "_id": category4Id,
            "name": "Văn hoá",
            "createdAt": moment().toISOString()
        },
        {
            "_id": category5Id,
            "name": "Đời sống",
            "createdAt": moment().toISOString()
        },
        {
            "_id": category6Id,
            "name": "Công nghệ",
            "createdAt": moment().toISOString()
        }
    ],

    //tags
    "tags": [
        {
            "_id": tag1Id,
            "name": "Bóng đá",
            "category": category1Id,
            "createdAt": moment().toISOString()
        },
        {
            "_id": tag2Id,
            "name": "Tennis",
            "category": category1Id,
            "createdAt": moment().toISOString()
        },
        {
            "_id": tag3Id,
            "name": "Vbiz",
            "category": category2Id,
            "createdAt": moment().toISOString()
        },
        {
            "_id": tag4Id,
            "name": "Điện ảnh",
            "category": category2Id,
            "careatedAt": moment().toISOString()
        },
        {
            "_id": tag5Id,
            "name": "Món ngon hằng ngày",
            "category": category3Id,
            "createdAt": moment().toISOString()
        },
        {
            "_id": tag6Id,
            "name": "Đặc sản các miền",
            "category": category3Id,
            "createdAt": moment().toISOString()
        },
        {
            "_id": tag7Id,
            "name": "Tác phẩm nghệ thuật",
            "category":category4Id,
            "createdAt": moment().toISOString()
        },
        {
            "_id": tag8Id,
            "name": "Di sản văn hoá",
            "category": category4Id,
            "createdAt": moment().toISOString()
        },
        {
            "_id": tag9Id,
            "name": "Cuộc sống quanh ta",
            "category": category5Id,
            "createdAt": moment().toISOString()
        },
        {
            "_id": tag10Id,
            "name": "Thế giới động vật",
            "category": category5Id,
            "createdAt": moment().toISOString()
        },
        {
            "_id": tag11Id,
            "name": "Bảo vệ môi trường",
            "category": category6Id,
            "createdAt": moment().toISOString()
        },
        {
            "_id": tag12Id,
            "name": "Smartphone",
            "category": category6Id,
            "createdAt": moment().toISOString()
        }
    ],

    //comments
    "comments": [
        {
            "_id": comment1Id,
            "content": "Bài có chất lượng tốt và phong phú",
            "subscriber": user3Id,
            "post": post1Id
        },
        {
            "_id": comment2Id,
            "content": "Có chỗ cần hiệu chỉnh thêm",
            "subscriber": user3Id,
            "post": post2Id
        },
        {
            "_id": comment3Id,
            "content": "Không biết nên commend sao",
            "subscriber": user3Id,
            "post": post3Id
        }
    ], 

    //posts
    "posts": [
        {
            "_id": post1Id,
            "title": "Lộ diện cái tên bất ngờ thứ 2 gia nhập MU",
            "image": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80",
            "linkYoutube": "www.youtube.com",
            "like": 100,
            "sucContent": "MU khá tự tin sẽ thành công trong thương vụ chiêu mộ tiền vệ trị giá 25 triệu bảng của Newcastle - Sean Longstaff.",
            "content": "Sau khi ký 5 năm với tân binh đầu tiên Daniel James, Solskjaer và các cộng sự muốn Longstaff là cái tên thứ hai gia nhập đội chủ sân Old Trafford hè này.Nguồn tin từ Mirror cho hay, các nhà tuyển trạch Quỷ đỏ khá ấn tượng với màn trình diễn của chàng tiền vệ 21 tuổi người Anh. Tuy nhiên, chấn thương đầu gối nghiêm trọng hồi tháng 3 đã khép lại mùa bóng sớm đối với Longstaff.Ole Gunnar Solskjaer xem Longstaff là sự thay thế lý tưởng cho Matic trong thời gian tới. Theo nhiều chuyên gia, lối đá của cầu thủ Newcastle có phần khá giống cựu tiền vệ Michael Carrick.Điểm mạnh ở Sean Longstaff là những tình huống đánh chặn, giải vây thông minh. Bên cạnh đó, khả năng chuyền bóng cũng tương đối ấn tượng.Bản thân chiến lược gia người Na Uy cũng theo dõi Longstaff từ vài tháng qua và tin rằng anh có thể phát triển thành cầu thủ lớn tại Old Trafford trong những năm tới.",
            "createdAt": moment().toISOString(),
            "premium": false,
            "status": 0,
            "category": category1Id,
            "tags": [tag1Id, tag2Id],
            "writer": user1Id,
            "comments": [comment1Id, comment2Id]
        },
        {
            "_id": post2Id,
            "title": "Công Phượng có sai lầm khi chọn bến đỗ “không ai ngờ” ở Pháp, không phải Paris FC?",
            "image": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80",
            "linkYoutube": "www.youtube.com",
            "like": 110,
            "sucContent": "CLB Chamois Niortais FC của Pháp có thể sẽ không phải là “miền đất hứa” với Công Phượng.",
            "content": "Theo những thông tin ban đầu thì điểm đến của Công Phượng ở Pháp sẽ là CLB Paris FC ở giải Ligue 2. Tuy nhiên, những thông tin mới nhất vừa được rò rỉ thì nơi mà khả năng cao Công Phượng sẽ tới thử việc lại không phải là Paris FC mà là Chamois Niortais FC. Nếu xét về danh tiếng thì Chamois Niortais FC có phần lép vế so với Paris FC. Tuy nhiên, Chamois Niortais FC chắc chắn sẽ là môi trường cực kỳ khốc liệt một khi Công Phượng tới đây để thử việc. Bởi CLB này đang có rất nhiều sự lựa chọn khác nhau ở vị trí tiền đạo. Nếu muốn khẳng định được khả năng của mình, Công Phượng sẽ vấp phải sự cạnh tranh không hề dễ chịu. Theo danh sách hiện tại, Chamois Niortais FC đang sở hữu tổng cộng 5 tiền đạo gồm Goduine Kidelou, Ande Dona Ndoh, Thibaut Vion, Dabasse và Zoumana Kone. Trong số này thì nổi bật nhất phải kể tới chân sút người Cameroon Ande Dona Ndoh. Cầu thủ 33 tuổi này từng trải qua tới 157 lần khoác áo CLB Chamois Niortais FC, ghi 58 bàn (kể từ năm 2014). Như vậy, tính trung bình, cầu thủ này ghi hơn 10 bàn/mùa, một thành tích tương đối đáng nể.",
            "createdAt": moment().toISOString(),
            "premium": false,
            "status": 0,
            "category": category1Id,
            "tags": [tag1Id. tag2Id],
            "writer": user1Id,
            "comments": [comment1Id, comment3Id]
        },
        {
            "_id": post3Id,
            "title": "Nhận xét vợ không hoàn hảo nhưng biết lý do Ưng Hoàng Phúc cưới Kim Cương, ai cũng nể phục",
            "image": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80",
            "linkYoutube": "www.youtube.com",
            "like": 120,
            "sucContent": "Khi mình lấy chồng hoặc vợ mà người đó biết yêu thương chăm sóc cha mẹ mình như cha mẹ họ thì đó chính là người chồng/ vợ mình nên nắm giữ, nên trân trọng, Ưng Hoàng Phúc nói.",
            "content": "Ưng Hoàng Phúc và cựu người mẫu Kim Cương có hơn 8 năm chung sống, dù họ chỉ mới tổ chức đám cưới cách đây nửa năm và đang chuẩn bị đón đứa con chung thứ 2. Ưng Hoàng Phúc cho rằng, vợ chồng là duyên số, không ai có thể chọn được và anh cũng không ngoại lệ. Nhưng việc lấy được Kim Cương làm vợ là phúc phần của anh và gia đình. Ưng Hoàng Phúc chia sẻ: Dòng họ bên nội nhà Phúc, 3 đời đều có người đi tu nên có lẽ Phúc được hưởng cái phúc đó và gặp nhiều may mắn trong cuộc sống. Đã là con người, không ai hoàn hảo cả. Nhưng khi mình lấy chồng hoặc vợ mà người đó biết yêu thương chăm sóc cha mẹ mình như cha mẹ họ thì đó chính là người chồng/ vợ mình nên nắm giữ, nên trân trọng. Khi về sống với Kim Cương, Phúc thấy được yếu tố đó ở cô ấy. 8 năm sống chung là khoảng thời gian để mình hiểu quá rõ tâm tính người kia thế nào, tốt xấu gì cũng lộ ra hết. Kim Cương không chỉ tốt với cha mẹ ruột của Phúc mà còn chan hòa và tốt với tất cả mọi người xung quanh. Bởi thấy được Kim Cương sống rất đạo đức nên Phúc trân trọng và chọn Kim Cương là người bạn đời đi chung với mình tới suốt đời, dù Kim Cương cũng không phải là người hoàn hảo.",
            "createdAt": moment().toISOString(),
            "premium": false,
            "status": 0,
            "category": category2Id,
            "tags": [tag3Id],
            "writer": user1Id,
            "comments": [comment1Id, comment3Id]
        },
        {
            "_id": post4Id,
            "title": "Bức ảnh “Cô bộ đội bế em bé” cách đây 40 năm và phép màu giữa đời thực",
            "image": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80",
            "linkYoutube": "www.youtube.com",
            "like": 130,
            "sucContent": "Hoàn cảnh khó khăn cùng bệnh tình của bà Bùi Thị Mùi - một trong hai nhân vật chính trong bức ảnh “Cô bộ đội và em bé” đã thôi thúc nhiều người tình nguyện chung tay giúp đỡ, sẻ chia.",
            "content": "Bà Bùi Thị Mùi được biết đến qua khoảnh khắc cứu giúp em bé hơn 2 tuổi khi mẹ em bị bắn trọng thương trong cuộc chiến tranh biên giới phía Bắc năm 1979. Năm ấy, bà Mùi là cô bộ đội chỉ mới 20 tuổi, khi đến khu vực cầu Tài Hồ Sìn (huyện Hòa An, Cao Bằng) đã phát hiện một em bé cùng người mẹ đang bị thương nặng sau đợt tấn công của địch.Cô bộ đội Mùi đã nhận bế em bé trên tay suốt hơn một ngày đêm, đưa hai mẹ con em từ rừng ra. Khoảnh khắc chân thực được nhà báo, nghệ sĩ nhiếp ảnh Trần Mạnh Thường kịp ghi lại.",
            "createdAt": moment().toISOString(),
            "premium": false,
            "status": 0,
            "category": category5Id,
            "tags": [tag7Id, tag9Id],
            "writer": user2Id,
            "comments": [comment1Id, comment3Id]
        },
        {
            "_id": post5Id,
            "title": "Nhà trường không chịu lắp máy lạnh, nam sinh cầm bảng biểu tình một lúc nhưng nóng quá nên nhảy xuống hồ làm loạn tiếp",
            "image": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80",
            "linkYoutube": "www.youtube.com",
            "like": 200,
            "sucContent": "Một nam sinh đã “biểu tình” bằng cách nhảy hồ vì nhà trường không chịu lắp máy lạnh ở Trung Quốc đang gây xôn xao cư dân mạng.",
            "content": "Là học sinh, sinh viên thì ai mà không muốn được học trong một môi trường đầy đủ tiện nghi và mát mẻ chứ! Chuyện học hành đã đủ khó và mệt, đằng này lại học trong một môi trường nóng nực thì làm sao tránh khỏi bất mãn Mới đây, cộng đồng mạng Weibo vừa lan truyền thông tin về vụ việc một cậu nam sinh Trung Quốc đã bất ngờ nhảy hồ để biểu tình về cơ sở vật chất với ngôi trường cậu đang theo học. Nguyên nhân khiến nam sinh bức xúc đến mức có hành động có phần nguy hiểm như thế là do nhà trường không chịu lắp máy lạnh cho sinh viên. Anh ta đã cầm một tấm bảng ghi ba chữ “lắp máy lạnh” và đứng trước sân trường nhiều giờ liền rồi nhảy xuống hồ để đòi quyền lợi.",
            "createdAt": moment().toISOString(),
            "premium": false,
            "status": 3,
            "category": category5Id,
            "tags": [tag9Id],
            "writer": user1Id,
            "comments": [comment1Id, comment3Id]
        },
        {
            "_id": post6Id,
            "title": "Chiêm Ngưỡng Vẻ Đẹp Của Venice - Thành Phố Lãng Mạn Nhất Thế Giới",
            "image": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80",
            "linkYoutube": "www.youtube.com",
            "like": 300,
            "sucContent": "Thành phố Venice nước Ý là một thành phố lịch sử xinh đẹp ở đông bắc nước Italy. Đây là nơi mà mỗi góc độ của nó đều mang một vẻ lãng mạn, huyền bí. Nơi mà thực tế pha trộn hài hòa với những ước mơ và là nơi mà tất cả mọi người nên đến một lần trong cuộc đời của họ, nếu có thể.",
            "content": "Thành phố Venice nước Ý là một thành phố lịch sử xinh đẹp ở đông bắc nước Italy. Đây là nơi mà mỗi góc độ của nó đều mang một vẻ lãng mạn, huyền bí. Nơi mà thực tế pha trộn hài hòa với những ước mơ và là nơi mà tất cả mọi người nên đến một lần trong cuộc đời của họ, nếu có thể. Ngoài việc sử dụng thuyền Gondola để di chuyển, du khách có thể tản mạn đi bộ, tận hưởng trọn vẹn những khoảnh khắc tuyệt vời cùng những người thương yêu. Và đây chính là lý do đặc biệt Venice là khu đô thị duy nhất ở Châu Âu hoàn toàn không có không còn những tiếng xe cộ ồn ào, khí thải và bụi bặm của ô tô và xe tải.",
            "createdAt": moment().toISOString(),
            "premium": false,
            "status": 1,
            "category": category4Id,
            "tags": [tag7Id, tag9Id],
            "writer": user2Id,
            "comments": [comment1Id, comment3Id]
        },
        {
            "_id": post7Id,
            "title": "Tối nay ăn gì: Gợi ý mâm cơm chiều hè thơm ngon, bổ dưỡng lại dễ ăn",
            "image": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80",
            "linkYoutube": "www.youtube.com",
            "like": 220,
            "sucContent": "Chẳng cần cao lương mĩ vị, chỉ cần kết hợp và chế biến khéo léo các nguyên liệu phổ biến, bạn đã có mâm cơm gia đình thơm ngon, bổ dưỡng mà dễ ăn trong những ngày hè oi nóng này!",
            "content": "Mâm cơm bao gồm: Bắp bò hầm nhừ chấm với mắm gừng, rau dền nấu canh, rau bí xào tỏi, thịt ba chỉ kho dừa hơi nhạt để có thể ăn vã. Ngoài ra, bạn có thể chuẩn bị thêm một bát cà muối xổi giảm ngấy đưa cơm. Toàn bộ các nguyên liệu cho mâm cơm này chỉ tốn đúng 90.000 thôi nhé! Mâm cơm cho 6 người đầy đủ dinh dưỡng gồm: Tôm hấp, mề gà xào đỗ, nạc vai chiên giòn tẩm bột, canh chua mọc dọc mùng. Mùa hè nóng nực đừng quên đầu tư thêm lon bia - Một nửa dùng hấp tôm, một nửa nhấm nháp nhé! ",
            "createdAt": moment().toISOString(),
            "premium": false,
            "status": 2,
            "category": category3Id,
            "tags": [tag5Id],
            "writer": user2Id,
            "comments": [comment1Id, comment3Id]
        },
        {
            "_id": post8Id,
            "title": "Nhờ vả giúp đỡ về công nghệ có thể gây rạn nứt tình cảm",
            "image": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80",
            "linkYoutube": "www.youtube.com",
            "like": 200,
            "sucContent": "Công nghệ đã thay đổi cách chúng ta sống, không chỉ trên khía cạnh tài chính mà còn là mối quan hệ của các thế hệ. ",
            "content": "Khảo sát mới của Kaspersky cho thấy hơn một phần ba (35%) người dùng trên 55 tuổi phải vật lộn với những vấn đề công nghệ nếu không có sự trợ giúp từ người trẻ. Do đó, họ có xu hướng nhờ đến những thành viên trong gia đình khi có bất kỳ câu hỏi nào, từ việc xem lại kết nối internet, tải dữ liệu lên đám mây, hay bảo mật ứng dụng ngân hàng. Tuy nhiên, đối với thế hệ Millennials – những người đang ở độ tuổi cần tập trung cho mục tiêu cá nhân như mua nhà, sinh con và thăng tiến sự nghiệp, yêu cầu trợ giúp từ thành viên lớn tuổi trong gia đình dần trở nên quá tải. Hơn một nửa (55%) cảm thấy bị ràng buộc khi phải luôn chịu trách nhiệm giải đáp thắc mắc về công nghệ cho người thân lớn tuổi; một phần tư (25%) lại cho biết sẽ chủ động tránh những thành viên mà họ biết chắc sẽ nhờ giải đáp điều gì đó.",
            "createdAt": moment().toISOString(),
            "premium": false,
            "status": 4,
            "category": category6Id,
            "tags": [tag11Id, tag12Id],
            "writer": user2Id,
            "comments": [comment1Id, comment3Id]
        },
        {
            "_id": post9Id,
            "title": "Google Dịch tiếng Việt đang bị phá hoại",
            "image": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80",
            "linkYoutube": "www.youtube.com",
            "like": 200,
            "sucContent": "Tính năng đóng góp bản dịch của Google đang bị lợi dụng để truyền tải những thông điệp cá nhân, ảnh hưởng cộng đồng.",
            "content": "Công cụ Google Dịch đang bị đem ra làm trò đùa trên mạng xã hội những ngày gần đây. Cụ thể, khi người dùng dịch câu go o morning từ tiếng Anh sang tiếng Việt, kết quả trả về là tiếng Anh ghi cũng ngu, phải là good Morning. Trường hợp tương tự cũng xảy ra với từ "I'm tr". Kết quả nhận được từ Google Dịch khi nhập câu này là "sai chính tả rồi má".",
            "createdAt": moment().toISOString(),
            "premium": false,
            "status": 4,
            "category": category6Id,
            "tags": [tag11Id, tag12Id],
            "writer": user2Id,
            "comments": [comment1Id, comment3Id]
        },
        {
            "_id": post10Id,
            "title": "Canada: Câu được cá tầm khổng lồ như cá mập, nặng hơn 360kg",
            "image": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80",
            "linkYoutube": "www.youtube.com",
            "like": 200,
            "sucContent": "Ba tay câu cùng nhau phối hợp mới chinh phục được con cá tầm nặng hơn 360kg ở Canada.",
            "content": "Theo Global News, Alex Kirk, Tom Kirk và Terry Jacobson bắt được con cá tầm khổng lồ khi đi câu trên sông Fraser ở tỉnh British Columbia, Canada hôm 11/6. Con cá tầm dài 3,3m và nặng hơn 360kg. Chúng tôi không tin nổi vào mắt mình nữa. Con cá nhô cao khỏi mặt nước khiến chúng tôi lầm tưởng nó là một con cá mập, Tom chia sẻ. Đúng hơn là một con cá mập trắng khổng lồ. Thật là kinh ngạc, Jacobson nói thêm.",
            "createdAt": moment().toISOString(),
            "premium": false,
            "status": 4,
            "category": category5Id,
            "tags": [tag7Id, tag8Id],
            "writer": user2Id,
            "comments": [comment1Id, comment3Id]
        },
    ],

    // users
    "users":[
        {
            "_id": user1Id,
            "email": "lequocthai1998@gmail.com",
            "password": "gagtrxrz111",
            "name": "Lê Quốc Thái",
            "role": "GUEST",
            "avatar": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80"
        },
        {
            "_id": user2Id,
            "email": "lequocduyquang@gmail.com",
            "password": "123456789",
            "name": "Lê Quốc Duy Quang",
            "role": "GUEST",
            "avatar": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80"
        },
        {
            "_id": user3Id,
            "email": "lequocthai@gmail.com",
            "password": "gagtrxrz111",
            "name": "Huỳnh Lâm Phú Sĩ",
            "role": "SUBSCRIBER",
            "membership": "1",
            "avatar": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80"
        },
        {
            "_id": user4Id,
            "email": "lequocthai1998@gmail.com",
            "password": "gagtrxrz111",
            "role": "WRITER",
            "name": "Lê Quốc Sang",
            "address": "333 Lý Thái Tổ, P9, Q10",
            "company": "HCMUS",
            "posts": [post1Id, post2Id],
            "avatar": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80"
        },
        {
            "_id": user5Id,
            "email": "lequocduyquang@gmail.com",
            "password": "123456789",
            "role": "EDITOR",
            "name": "Lê Quốc",
            "address": "TPHCM",
            "categories": [category1Id, category2Id],
            "avatar": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80"
        },
        
    ],

}
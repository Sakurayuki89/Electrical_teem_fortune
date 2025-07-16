package com.fortune.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class FortuneController {
    
    @GetMapping("/fortune/{zodiac}")
    public ResponseEntity<Map<String, String>> getFortune(@PathVariable String zodiac) {
        try {
            String url = "https://fortune.nate.com/contents/freeunse/dayjiji.nate";
            Document doc = Jsoup.connect(url)
                .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
                .get();
            
            Map<String, String> result = new HashMap<>();
            
            // 네이트 운세 페이지 구조에 맞게 셀렉터 조정
            Elements fortunes = doc.select(".unse_t_list li");
            
            for (Element fortune : fortunes) {
                String label = fortune.select(".unse_t_l").text();
                String text = fortune.select(".unse_t_d").text();
                
                // 띠 이름 매칭
                if (label.contains(zodiac)) {
                    result.put("zodiac", zodiac);
                    result.put("fortune", text);
                    result.put("success", "true");
                    return ResponseEntity.ok(result);
                }
            }
            
            // 매칭되는 띠를 찾지 못한 경우
            result.put("success", "false");
            result.put("message", "해당 띠의 운세를 찾을 수 없습니다.");
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            Map<String, String> errorResult = new HashMap<>();
            errorResult.put("success", "false");
            errorResult.put("message", "운세 정보를 가져오는데 실패했습니다: " + e.getMessage());
            return ResponseEntity.ok(errorResult);
        }
    }
}
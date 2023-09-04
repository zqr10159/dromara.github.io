import{_ as n,a as s,b as a,c as t,d as p,e as o,f as e,g as c,h as l,i,j as u,k,l as r}from"./13-e21aeb4d.js";import{_ as d,o as m,c as g,h as v}from"./app-e339ea9d.js";const b={},f=v(`<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2><p>sign 插件用来对请求进行签名认证的插件</p><h2 id="ak-sk-介绍" tabindex="-1"><a class="header-anchor" href="#ak-sk-介绍" aria-hidden="true">#</a> AK/SK 介绍</h2><p>AK/SK（Access Key ID/Secret Access Key）即访问密钥，包含访问密钥 ID（AK）和秘密访问密钥（SK）两部分，主要用于对用户的调用行为进行鉴权和认证。</p><h2 id="插件使用-以-dubbo-findall-为例" tabindex="-1"><a class="header-anchor" href="#插件使用-以-dubbo-findall-为例" aria-hidden="true">#</a> 插件使用-以（/dubbo/findAll）为例</h2><h3 id="在-soulbootstrap-的-pom-xml-文件中添加-sign-的支持" tabindex="-1"><a class="header-anchor" href="#在-soulbootstrap-的-pom-xml-文件中添加-sign-的支持" aria-hidden="true">#</a> 在 SoulBootstrap 的 pom.xml 文件中添加  <code>sign</code>  的支持</h3><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>  <span class="token comment">&lt;!-- soul sign plugin start--&gt;</span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.dromara<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>soul-spring-boot-starter-plugin-sign<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\${last.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
  <span class="token comment">&lt;!-- soul sign plugin end--&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="新增-appkey-secretkey" tabindex="-1"><a class="header-anchor" href="#新增-appkey-secretkey" aria-hidden="true">#</a> 新增 appKey，secretKey</h3><p><img src="`+n+'" alt="image.png" loading="lazy"><br><img src="'+s+'" alt="image.png" loading="lazy"><br><img src="'+a+'" alt="image.png" loading="lazy"><br><img src="'+t+'" alt="image.png" loading="lazy"></p><h2 id="配置选择器和规则器" tabindex="-1"><a class="header-anchor" href="#配置选择器和规则器" aria-hidden="true">#</a> 配置选择器和规则器</h2><p>添加选择器<br><img src="'+p+'" alt="image.png" loading="lazy"><br> 添加规则器<br><img src="'+o+`" alt="image.png" loading="lazy"></p><h3 id="增加获取鉴权服务" tabindex="-1"><a class="header-anchor" href="#增加获取鉴权服务" aria-hidden="true">#</a> 增加获取鉴权服务</h3><p>在自己服务中增加一个对外访问的方法</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/authUrl&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">authUrl</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> map <span class="token operator">=</span> <span class="token class-name">Maps</span><span class="token punctuation">.</span><span class="token function">newHashMapWithExpectedSize</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//timestamp为毫秒数的字符串形式 String.valueOf(LocalDateTime.now().toInstant(ZoneOffset.of(&quot;+8&quot;)).toEpochMilli())</span>
        <span class="token class-name">String</span> timetamp <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toInstant</span><span class="token punctuation">(</span><span class="token class-name">ZoneOffset</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;+8&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEpochMilli</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>timetamp<span class="token punctuation">)</span><span class="token punctuation">;</span>
        map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;timestamp&quot;</span><span class="token punctuation">,</span>timetamp<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">//值应该为毫秒数的字符串形式</span>
        map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;path&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;/dubbo/findAll&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;version&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;1.0.0&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> storedKeys <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>map<span class="token punctuation">.</span><span class="token function">keySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">sorted</span><span class="token punctuation">(</span><span class="token class-name">Comparator</span><span class="token punctuation">.</span><span class="token function">naturalOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">final</span> <span class="token class-name">String</span> sign <span class="token operator">=</span> storedKeys<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>key <span class="token operator">-&gt;</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> key<span class="token punctuation">,</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">joining</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token string">&quot;D19CF79F647A465AB9C5C66F430CAD28&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//SECRETkey</span>
        <span class="token keyword">return</span> <span class="token class-name">DigestUtils</span><span class="token punctuation">.</span><span class="token function">md5DigestAsHex</span><span class="token punctuation">(</span>sign<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面需要注意的<br><img src="`+e+'" alt="image.png" loading="lazy"></p><h3 id="在网关中增加鉴权头信息" tabindex="-1"><a class="header-anchor" href="#在网关中增加鉴权头信息" aria-hidden="true">#</a> 在网关中增加鉴权头信息</h3><figure><img src="'+c+'" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><h3 id="请求的结果演示" tabindex="-1"><a class="header-anchor" href="#请求的结果演示" aria-hidden="true">#</a> 请求的结果演示</h3><p>通过的返回<br><img src="'+l+'" alt="image.png" loading="lazy"><br> 5min 超时的返回<br><img src="'+i+'" alt="image.png" loading="lazy"><br> appKey 填写错误的返回<br><img src="'+u+'" alt="image.png" loading="lazy"><br> 签名错误的返回<br><img src="'+k+'" alt="image.png" loading="lazy"><br> 禁用 sign 插件的返回<br><img src="'+r+`" alt="image.png" loading="lazy"></p><h2 id="sign-插件的实现分析" tabindex="-1"><a class="header-anchor" href="#sign-插件的实现分析" aria-hidden="true">#</a> sign 插件的实现分析</h2><h3 id="java-中-pair" tabindex="-1"><a class="header-anchor" href="#java-中-pair" aria-hidden="true">#</a> java 中 Pair</h3><p>简单的说就是 pair 保存的是一对 key value，而 map 可以保存多对 key value。<br> SignPlugin 插件调用 DefaultSignService 中 signVerify 方法<br> 判断 sign 插件是否可用，如果可用获取在 global 插件存入的 soulContext 并调用 verify 方法</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>signData <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> signData<span class="token punctuation">.</span><span class="token function">getEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">final</span> <span class="token class-name">SoulContext</span> soulContext <span class="token operator">=</span> exchange<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token class-name">Constants</span><span class="token punctuation">.</span><span class="token constant">CONTEXT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">assert</span> soulContext <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token function">verify</span><span class="token punctuation">(</span>soulContext<span class="token punctuation">,</span> exchange<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>verify 方法中<br> 判断请求头信息是否正确<br> 如果不正确就抛出  log.error(&quot;sign parameters are incomplete,{}&quot;, soulContext)异常</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isBlank</span><span class="token punctuation">(</span>soulContext<span class="token punctuation">.</span><span class="token function">getAppKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token operator">||</span> <span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isBlank</span><span class="token punctuation">(</span>soulContext<span class="token punctuation">.</span><span class="token function">getSign</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token operator">||</span> <span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isBlank</span><span class="token punctuation">(</span>soulContext<span class="token punctuation">.</span><span class="token function">getTimestamp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&quot;sign parameters are incomplete,{}&quot;</span><span class="token punctuation">,</span> soulContext<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token class-name">Pair</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token class-name">Boolean</span><span class="token punctuation">.</span><span class="token constant">FALSE</span><span class="token punctuation">,</span> <span class="token class-name">Constants</span><span class="token punctuation">.</span><span class="token constant">SIGN_PARAMS_ERROR</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>判断请求时间是否超时</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>    <span class="token keyword">if</span> <span class="token punctuation">(</span>between <span class="token operator">&gt;</span> delay<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token class-name">Pair</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token class-name">Boolean</span><span class="token punctuation">.</span><span class="token constant">FALSE</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token class-name">SoulResultEnum</span><span class="token punctuation">.</span><span class="token constant">SING_TIME_IS_TIMEOUT</span><span class="token punctuation">.</span><span class="token function">getMsg</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> delay<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>没有超时继续调用 sign 方法<br> 获取认证数据，这个数据在 soulAdmin 中配置</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">AppAuthData</span> appAuthData <span class="token operator">=</span> <span class="token class-name">SignAuthDataCache</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">obtainAuthData</span><span class="token punctuation">(</span>soulContext<span class="token punctuation">.</span><span class="token function">getAppKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>后面对 appAuthData 数据进行判断，数据有错误就不通过<br> 对获取的参数再次签名，判断传入的和再次签名的是否一样</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">String</span> sigKey <span class="token operator">=</span> <span class="token class-name">SignUtils</span><span class="token punctuation">.</span><span class="token function">generateSign</span><span class="token punctuation">(</span>appAuthData<span class="token punctuation">.</span><span class="token function">getAppSecret</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">buildParamsMap</span><span class="token punctuation">(</span>soulContext<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果都校验都通过就完成认证 访问请求。</p>`,32),h=[f];function y(_,x){return m(),g("div",null,h)}const C=d(b,[["render",y],["__file","soul_source_learning_12_sign.html.vue"]]);export{C as default};

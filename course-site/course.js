// TaskFlow Backend Course — curriculum data
// Each module: id, title, sub, intro, lessons[], project{}, quiz[], interview[]
// Each lesson: id, title, min, goals[], body(html), py?(python), code?(ts), points[], task(html)

window.COURSE = [
{
  id: "m0", title: "איך ה-Web עובד", sub: "יסודות: לקוח, שרת, HTTP וטרמינל",
  intro: "לפני שכותבים שורת קוד אחת של שרת, צריך להבין מה קורה בין הדפדפן לבין השרת. במודול הזה נבנה את המודל המנטלי שכל שאר הקורס נשען עליו.",
  lessons: [
    { id: "m0l1", title: "מה זה בכלל Backend?", min: 20,
      goals: ["להבין את חלוקת העבודה בין Frontend ל-Backend", "להכיר את התפקידים של מפתחת Backend"],
      body: `<p>כל אפליקציה שאת מכירה בנויה משני צדדים. <b>הלקוח</b> (דפדפן, אפליקציית מובייל) מציג ממשק ושולח בקשות. <b>השרת</b> מקבל את הבקשות, מחליט מה מותר, שומר ושולף נתונים, ומחזיר תשובה.</p>
<p>מפתחת Backend אחראית על:</p>
<ul><li><b>API</b> – החוזה שדרכו הלקוח מדבר עם השרת.</li><li><b>נתונים</b> – בסיסי נתונים, מודל הנתונים, שלמות המידע.</li><li><b>לוגיקה עסקית</b> – החוקים של המוצר (מי רשאי לסגור משימה? מה קורה כשתאריך יעד עבר?).</li><li><b>אבטחה</b> – אימות משתמשים, הרשאות, הגנה מתקיפות.</li><li><b>אמינות וביצועים</b> – שהמערכת תעבוד מהר גם כשיש מיליון משתמשים.</li></ul>
<p>לאורך הקורס נבנה פרויקט אחד: <b>TaskFlow</b>, API לניהול משימות בצוותים. הוא יתחיל כקובץ אחד ויגיע למערכת עם מטמון, תורים ומספר שרתים.</p>`,
      code: `Client (Browser / App)
   │   GET /projects/42/tasks
   ▼
API Server (Node.js + TypeScript)
   │   SELECT * FROM tasks WHERE project_id = 42
   ▼
Database (PostgreSQL)
   │   rows
   ▼
API Server  ──►  200 OK  [{"id":1,"title":"Write spec"}]  ──►  Client`, lang: "plaintext",
      points: ["השרת הוא מקור האמת. אסור לסמוך על מה שהלקוח שולח.", "API הוא חוזה: שינוי שובר יכול להפיל לקוחות.", "Backend = נתונים + חוקים + אבטחה + אמינות."],
      task: `<p>בחרי אפליקציה שאת משתמשת בה (וואטסאפ, וולט, ג'ימייל). רשמי 5 פעולות שאת עושה בה, ולכל אחת נחשי: איזו בקשה נשלחת לשרת, ואיזה מידע השרת צריך לשמור.</p>` },
    { id: "m0l2", title: "HTTP לעומק", min: 40,
      goals: ["לקרוא ולכתוב בקשת HTTP", "להכיר methods, status codes ו-headers"],
      body: `<p>HTTP הוא פרוטוקול טקסטואלי של <b>בקשה ותשובה</b>. כל בקשה מכילה:</p>
<ul><li><b>Method</b> – מה רוצים לעשות: <code>GET</code> (לקרוא), <code>POST</code> (ליצור), <code>PUT</code>/<code>PATCH</code> (לעדכן), <code>DELETE</code> (למחוק).</li><li><b>Path</b> – על איזה משאב: <code>/tasks/7</code>.</li><li><b>Headers</b> – מטא-דאטה: <code>Content-Type</code>, <code>Authorization</code>.</li><li><b>Body</b> – תוכן, בדרך כלל JSON.</li></ul>
<p>התשובה מכילה <b>status code</b>, headers ו-body. את הקודים כדאי לדעת בעל פה:</p>
<ul><li><code>2xx</code> הצלחה: 200 OK, 201 Created, 204 No Content</li><li><code>3xx</code> הפניה: 301, 304 Not Modified</li><li><code>4xx</code> טעות של הלקוח: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422, 429 Too Many Requests</li><li><code>5xx</code> טעות של השרת: 500, 502 Bad Gateway, 503 Service Unavailable</li></ul>
<p>HTTP הוא <b>stateless</b>: כל בקשה עומדת בפני עצמה. לכן משתמשים ב-cookies או tokens כדי לזהות משתמש בין בקשות.</p>`,
      code: `POST /tasks HTTP/1.1
Host: api.taskflow.dev
Content-Type: application/json
Authorization: Bearer eyJhbGciOi...

{"title": "Write API spec", "projectId": 42}

---- response ----
HTTP/1.1 201 Created
Content-Type: application/json
Location: /tasks/918

{"id": 918, "title": "Write API spec", "status": "open"}`, lang: "http",
      points: ["401 = לא יודעים מי את. 403 = יודעים, ואין לך הרשאה.", "GET לא אמור לשנות שום דבר בשרת.", "Stateless מאפשר להוסיף שרתים בקלות. נחזור לזה במודול ה-Scale."],
      task: `<p>הריצי בטרמינל (Git Bash):</p><pre dir="ltr">curl -i https://httpbin.org/get
curl -i -X POST https://httpbin.org/post -H "Content-Type: application/json" -d '{"name":"noa"}'
curl -i https://httpbin.org/status/404</pre><p>זהי בכל תשובה את ה-status code, שני headers, ואת ה-body.</p>` },
    { id: "m0l3", title: "מה קורה כשמקלידים כתובת", min: 30,
      goals: ["להבין DNS, TCP, TLS ברמה של ראיון", "לדעת להסביר את המסלול המלא של בקשה"],
      body: `<p>זו אחת משאלות הראיון הקלאסיות. התשובה בשלבים:</p>
<ol><li><b>DNS</b> – הדפדפן מתרגם <code>taskflow.dev</code> לכתובת IP. קודם ב-cache מקומי, ואחר כך מול שרתי DNS.</li><li><b>TCP</b> – פתיחת חיבור לשרת בפורט 443 (three-way handshake: SYN, SYN-ACK, ACK).</li><li><b>TLS</b> – הצפנה. השרת מציג תעודה, ושני הצדדים מסכימים על מפתח הצפנה. זה ה-S ב-HTTPS.</li><li><b>HTTP Request</b> – נשלחת הבקשה.</li><li>בצד השרת: <b>Load Balancer</b>, אחריו שרת האפליקציה, ואחריו בסיס הנתונים.</li><li><b>Response</b> – התשובה חוזרת, והדפדפן מרנדר אותה.</li></ol>
<p>מושגים שכדאי להכיר: <b>IP</b> (כתובת של מחשב), <b>Port</b> (איזו תוכנה במחשב), <b>localhost</b> = 127.0.0.1 (המחשב שלך).</p>`,
      code: `# בדיקת DNS
nslookup github.com

# לראות את כל שלבי החיבור
curl -v https://github.com -o /dev/null

# איזה תהליך מאזין לפורט 3000 (Windows)
netstat -ano | findstr :3000`, lang: "bash",
      points: ["DNS ממפה שם ל-IP.", "TCP מבטיח הגעה ובסדר הנכון. TLS מצפין.", "Port מזהה תהליך: השרת שלך יאזין לפורט, למשל 3000."],
      task: `<p>כתבי במילים שלך (5-8 שורות) מה קורה מהרגע שמקלידים <code>https://google.com</code> ועד שהדף מופיע. אחר כך לחצי על "שאלי את המורה" והדביקי את התשובה לקבלת משוב.</p>` },
    { id: "m0l4", title: "טרמינל ו-Linux למפתחות", min: 45,
      goals: ["לעבוד בנוחות בשורת הפקודה", "להכיר תהליכים, הרשאות ומשתני סביבה"],
      body: `<p>שרתים בפרודקשן רצים כמעט תמיד על Linux, אז את רוב הפקודות תריצי בטרמינל. ב-Windows מומלץ להתקין <b>WSL</b> (Ubuntu בתוך Windows), או לעבוד עם Git Bash.</p>
<p>הפקודות שתשתמשי בהן כל יום:</p>
<ul><li>ניווט: <code>pwd</code>, <code>ls -la</code>, <code>cd</code></li><li>קבצים: <code>mkdir -p</code>, <code>touch</code>, <code>cp</code>, <code>mv</code>, <code>rm -r</code>, <code>cat</code>, <code>less</code></li><li>חיפוש: <code>grep -rn "TODO" src/</code>, <code>find . -name "*.ts"</code></li><li>Pipes: <code>cat app.log | grep ERROR | wc -l</code></li><li>תהליכים: <code>ps aux</code>, <code>kill PID</code>, <code>top</code></li><li>משתני סביבה: <code>export PORT=3000</code>, <code>echo $PORT</code></li><li>הרשאות: <code>chmod +x script.sh</code>, <code>sudo</code></li></ul>`,
      code: `# כמה שגיאות יש בלוג, מקובצות לפי סוג
grep "ERROR" app.log | awk '{print $4}' | sort | uniq -c | sort -rn

# לעקוב אחרי לוג בזמן אמת
tail -f app.log

# להריץ שרת עם משתנה סביבה
PORT=4000 node server.js`, lang: "bash",
      points: ["Pipe (|) מחבר פלט של פקודה אחת לקלט של הבאה.", "כל תהליך מקבל משתני סביבה. כך מעבירים קונפיגורציה לשרת.", "tail -f ו-grep הם הכלים הראשונים כשמשהו נשבר."],
      task: `<p>התקיני WSL (<code>wsl --install</code> ב-PowerShell כמנהלת), או פתחי Git Bash. צרי תיקייה <code>~/playground</code>, ובתוכה קובץ עם 10 שורות שחלקן מכילות ERROR. ספרי אותן עם <code>grep</code> ו-<code>wc</code>.</p>` },
    { id: "m0l5", title: "סביבת עבודה מוכנה", min: 30,
      goals: ["להתקין Node.js LTS ו-VS Code", "להריץ סקריפט TypeScript ראשון"],
      body: `<p>מה צריך להתקין:</p>
<ul><li><b>Node.js LTS</b> (22 ומעלה): דרך <code>fnm</code> או ההתקנה הרשמית. לבדיקה: <code>node -v</code>.</li><li><b>VS Code</b> עם התוספים ESLint, Prettier ו-REST Client (או Postman/Bruno).</li><li><b>Git</b> – כבר יש לך.</li><li><b>Docker Desktop</b> – נצטרך אותו במודול 4.</li></ul>
<p>מריצים TypeScript ישירות עם <code>tsx</code>, בלי שלב קומפילציה ידני. בגרסאות Node חדשות אפשר להריץ קבצי <code>.ts</code> גם ישירות.</p>`,
      code: `mkdir taskflow && cd taskflow
git init
npm init -y
npm i -D typescript tsx @types/node
npx tsc --init

# src/index.ts
echo 'console.log("Hello, Backend!")' > src/index.ts
npx tsx src/index.ts`, lang: "bash",
      points: ["npm הוא המקבילה של pip, ו-package.json הוא המקבילה של requirements.txt/pyproject.", "devDependencies = כלים לפיתוח בלבד.", "את התיקייה node_modules לא מכניסים ל-Git (‎.gitignore)."],
      task: `<p>צרי ריפו <code>taskflow</code> ב-GitHub, הריצי בו Hello World ב-TypeScript, ודחפי commit ראשון. זה יהיה הפרויקט שילווה אותך לאורך כל הקורס.</p>` }
  ],
  project: { title: "שלב 0: הקמת הריפו", desc: "ריפו TaskFlow מוכן לעבודה.", steps: ["ריפו ב-GitHub עם README שמתאר את המטרה", "Node LTS ו-TypeScript מותקנים, tsx מריץ את src/index.ts", "קובץ ‎.gitignore עם node_modules ו-.env", "קובץ notes/http.md עם 5 בקשות curl שהרצת ומה למדת מהן"] },
  quiz: [
    { q: "משתמשת מחוברת מנסה למחוק פרויקט של מישהו אחר. מה השרת צריך להחזיר?", opts: ["401 Unauthorized", "403 Forbidden", "404 Not Found", "500"], a: 1, why: "המשתמשת מזוהה (לכן לא 401), אבל אין לה הרשאה. יש מערכות שמחזירות 404 כדי לא לחשוף שהמשאב קיים, אבל התשובה הקנונית היא 403." },
    { q: "מה המשמעות של HTTP stateless?", opts: ["השרת לא שומר נתונים", "כל בקשה עומדת בפני עצמה, ללא זיכרון של בקשות קודמות", "אין headers", "החיבור לא מוצפן"], a: 1, why: "השרת יכול לשמור נתונים ב-DB, אבל הפרוטוקול עצמו לא זוכר בקשות קודמות. לכן שולחים token בכל בקשה." },
    { q: "איזה method מתאים ליצירת משימה חדשה?", opts: ["GET", "PUT", "POST", "PATCH"], a: 2, why: "POST יוצר משאב חדש ומחזיר בדרך כלל 201 Created." },
    { q: "מה התפקיד של DNS?", opts: ["הצפנת התעבורה", "תרגום שם דומיין לכתובת IP", "איזון עומסים", "שמירת cookies"], a: 1, why: "DNS הוא ספר הטלפונים של האינטרנט." }
  ],
  interview: [
    { q: "מה קורה כשמקלידים URL בדפדפן?", a: "DNS lookup, TCP handshake, TLS handshake, בקשת HTTP, ובצד השרת LB, אפליקציה ו-DB, ואז תשובה ורינדור. כדאי לציין caching בכל שכבה." },
    { q: "מה ההבדל בין PUT ל-PATCH?", a: "PUT מחליף את המשאב כולו והוא idempotent. PATCH מעדכן חלק מהשדות." },
    { q: "מה ההבדל בין 401 ל-403?", a: "401: לא אומתת (אין token או שהוא לא תקין). 403: אומתת, אבל אין לך הרשאה לפעולה." }
  ]
},
{
  id: "m1", title: "TypeScript למי שבאה מ-Python", sub: "השפה, הטיפוסים ו-async",
  intro: "את כבר יודעת לתכנת, אז לא נתחיל מאפס. נעבור על TypeScript דרך השוואה ל-Python, ונתעכב על מה שבאמת שונה: טיפוסים סטטיים ו-event loop.",
  lessons: [
    { id: "m1l1", title: "מ-Python ל-TypeScript", min: 40,
      goals: ["לתרגם קוד Python בסיסי ל-TypeScript", "להבין let/const, פונקציות ו-arrow functions"],
      body: `<p>TypeScript היא JavaScript עם מערכת טיפוסים. הקוד מתקמפל ל-JavaScript רגיל, והטיפוסים נמחקים בזמן ריצה. הם קיימים רק כדי לתפוס באגים לפני שהקוד רץ.</p>
<ul><li><code>const</code> – משתנה שלא מקבל השמה חדשה (ברירת המחדל שלך). <code>let</code> – משתנה שמשתנה. את <code>var</code> לא משתמשים.</li><li>בלוקים מסומנים בסוגריים מסולסלים <code>{}</code> ולא בהזחה.</li><li><code>===</code> במקום <code>==</code>, תמיד.</li><li><code>null</code> ו-<code>undefined</code> הם שני ערכים נפרדים, שניהם בערך כמו <code>None</code>.</li><li>Template strings עם backticks הם המקבילה ל-f-strings.</li></ul>`,
      py: `def greet(name: str, excited: bool = False) -> str:
    msg = f"Hello {name}"
    return msg + "!" if excited else msg

tasks = ["spec", "api", "tests"]
for i, t in enumerate(tasks):
    print(i, t)`,
      code: `function greet(name: string, excited = false): string {
  const msg = \`Hello \${name}\`;
  return excited ? msg + "!" : msg;
}

// arrow function (נפוץ מאוד)
const greet2 = (name: string): string => \`Hi \${name}\`;

const tasks = ["spec", "api", "tests"];
tasks.forEach((t, i) => console.log(i, t));
for (const t of tasks) console.log(t);   // for...of = for in של Python`, lang: "typescript",
      points: ["for...of עובר על ערכים. for...in עובר על מפתחות (כמעט לא משתמשים בו).", "const לא אומר שהערך קפוא: אפשר לשנות אובייקט שהוגדר ב-const.", "התשובות ל-truthy/falsy דומות, אבל מערך ריק הוא truthy ב-JS!"],
      task: `<p>תרגמי ל-TypeScript פונקציה שמקבלת רשימת מספרים ומחזירה אובייקט <code>{min, max, avg}</code>. הריצי עם <code>npx tsx</code>.</p>` },
    { id: "m1l2", title: "טיפוסים: type, interface ו-generics", min: 50,
      goals: ["להגדיר טיפוסים למודלים של TaskFlow", "להשתמש ב-union, optional ו-generics"],
      body: `<p>זה הלב של TypeScript. המטרה היא לתאר את צורת הנתונים כדי שהקומפיילר יתפוס טעויות.</p>
<ul><li><b>interface / type</b> – מתארים צורה של אובייקט. ההבדלים קטנים, ובחרי אחד באופן עקבי.</li><li><b>Union</b>: <code>"open" | "done"</code> – ערך יכול להיות רק אחד מאלה. זה דומה ל-<code>Literal</code> ב-Python.</li><li><b>Optional</b>: <code>dueDate?: Date</code></li><li><b>Generics</b>: <code>Array&lt;Task&gt;</code>, ‏<code>Promise&lt;User&gt;</code> – טיפוס שמקבל טיפוס, כמו <code>list[Task]</code>.</li><li><code>unknown</code> עדיף על <code>any</code>: הוא מכריח לבדוק את הטיפוס לפני שימוש.</li></ul>`,
      py: `from typing import Literal, Optional, TypedDict

class Task(TypedDict):
    id: int
    title: str
    status: Literal["open", "in_progress", "done"]
    due: Optional[str]`,
      code: `type TaskStatus = "open" | "in_progress" | "done";

interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  dueDate?: Date;          // אופציונלי
  assigneeId: number | null;
}

// Generic: עוטף כל סוג של תוצאה
interface Page<T> {
  items: T[];
  total: number;
  nextCursor?: string;
}

function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

const page: Page<Task> = { items: [], total: 0 };
// page.items.push({ id: 1, title: "x", status: "closed" }); ❌ שגיאת קומפילציה`, lang: "typescript",
      points: ["Union types מחליפים הרבה if-ים ו-enum-ים.", "הטיפוסים נמחקים בזמן ריצה, ולכן מידע שמגיע מבחוץ עדיין צריך ולידציה (Zod, במודול 3).", "strict: true ב-tsconfig. תמיד."],
      task: `<p>הגדירי בקובץ <code>src/types.ts</code> את הטיפוסים <code>User</code>, <code>Project</code> ו-<code>Task</code> ל-TaskFlow. לכל פרויקט יש owner ורשימת חברים, ולכל משימה יש priority מתוך <code>low | medium | high</code>.</p>` },
    { id: "m1l3", title: "מערכים ואובייקטים", min: 40,
      goals: ["לעבוד עם map/filter/reduce", "להשתמש ב-destructuring ו-spread"],
      body: `<p>ב-Python כותבים list comprehensions. ב-TS משרשרים מתודות על מערכים. אלה הכלים שתשתמשי בהם בכל endpoint:</p>
<ul><li><code>map</code> – לשנות כל איבר</li><li><code>filter</code> – לסנן</li><li><code>find</code> / <code>some</code> / <code>every</code></li><li><code>reduce</code> – לצבור לתוצאה אחת</li><li><code>Object.entries</code> / <code>Object.fromEntries</code> – המקבילה של <code>dict.items()</code></li><li><code>Map</code> ו-<code>Set</code> – מבני נתונים אמיתיים, עם חיפוש ב-O(1)</li></ul>`,
      py: `open_titles = [t["title"] for t in tasks if t["status"] == "open"]
by_status = {}
for t in tasks:
    by_status[t["status"]] = by_status.get(t["status"], 0) + 1
updated = {**task, "status": "done"}`,
      code: `const openTitles = tasks
  .filter(t => t.status === "open")
  .map(t => t.title);

const byStatus = tasks.reduce<Record<string, number>>((acc, t) => {
  acc[t.status] = (acc[t.status] ?? 0) + 1;
  return acc;
}, {});

// spread + destructuring
const updated = { ...task, status: "done" as const };
const { id, title, ...rest } = task;

// Map לחיפוש מהיר לפי id
const tasksById = new Map(tasks.map(t => [t.id, t]));
tasksById.get(918);`, lang: "typescript",
      points: ["?? (nullish) מחליף רק null/undefined. || מחליף כל ערך falsy, כולל 0.", "?. (optional chaining): user?.profile?.name", "עדיף לא לשנות את האובייקט המקורי, אלא ליצור עותק עם spread."],
      task: `<p>כתבי פונקציה <code>groupByAssignee(tasks)</code> שמחזירה <code>Map&lt;number, Task[]&gt;</code>, ופונקציה <code>overdue(tasks, now)</code> שמחזירה משימות שתאריך היעד שלהן עבר והן לא done.</p>` },
    { id: "m1l4", title: "מודולים, npm ו-tsconfig", min: 30,
      goals: ["לחלק קוד לקבצים עם import/export", "להבין package.json ו-scripts"],
      body: `<p>כל קובץ הוא מודול. מייצאים עם <code>export</code> ומייבאים עם <code>import</code>. נעבוד ב-<b>ESM</b> (<code>"type": "module"</code> ב-package.json), התקן המודרני.</p>
<p>ב-<code>package.json</code> החלק החשוב הוא <code>scripts</code>: פקודות שמריצים עם <code>npm run dev</code>. ובקובץ <code>package-lock.json</code> נעולות הגרסאות המדויקות. הוא נכנס ל-Git.</p>`,
      code: `// src/utils/stats.ts
export function avg(nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

// src/index.ts
import { avg } from "./utils/stats.js";

// package.json
{
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}`, lang: "typescript",
      points: ["ב-ESM עם Node כותבים .js בסוף ה-import גם כשהקובץ .ts (או מגדירים moduleResolution מתאים).", "tsx watch = הרצה מחדש אוטומטית כמו --reload.", "npm ci בשרת/CI, npm install במחשב שלך."],
      task: `<p>ארגני את הקוד מהשיעורים הקודמים ב-<code>src/types.ts</code> וב-<code>src/utils/tasks.ts</code>, והוסיפי scripts בשם <code>dev</code> ו-<code>build</code>. ודאי ש-<code>npm run build</code> עובר בלי שגיאות.</p>` },
    { id: "m1l5", title: "Async, Promises ו-Event Loop", min: 60,
      goals: ["להבין איך Node מריץ קוד אסינכרוני", "לכתוב async/await נכון, כולל מקביליות וטיפול בשגיאות"],
      body: `<p>זה הנושא הכי חשוב במודול. Node רץ על <b>thread אחד</b>. כשקוד מחכה ל-I/O (DB, רשת, קובץ), Node לא נחסם: הוא רושם callback וממשיך לבקשה הבאה. כשה-I/O מסתיים, ה-callback נכנס לתור, וה-<b>event loop</b> מריץ אותו.</p>
<p><b>Promise</b> מייצג ערך שיגיע בעתיד. <code>async/await</code> הוא תחביר נוח מעליו, דומה מאוד ל-asyncio. ההבדל: ב-Node <i>כל</i> ה-I/O אסינכרוני מטבעו, ואין צורך להפעיל event loop בעצמך.</p>
<p>טעות נפוצה: להריץ <code>await</code> בלולאה על דברים שאינם תלויים זה בזה. השתמשי ב-<code>Promise.all</code>.</p>`,
      py: `import asyncio
async def load(user_id):
    user, tasks = await asyncio.gather(get_user(user_id), get_tasks(user_id))
    return {"user": user, "tasks": tasks}`,
      code: `const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function getUser(id: number) { await sleep(100); return { id, name: "Noa" }; }
async function getTasks(id: number) { await sleep(150); return [{ id: 1, title: "x" }]; }

// ❌ סדרתי: ~250ms
async function slow(id: number) {
  const user = await getUser(id);
  const tasks = await getTasks(id);
  return { user, tasks };
}

// ✅ מקבילי: ~150ms
async function fast(id: number) {
  const [user, tasks] = await Promise.all([getUser(id), getTasks(id)]);
  return { user, tasks };
}

// טיפול בשגיאות
try {
  await fast(1);
} catch (err) {
  console.error("failed", err);
}

// ⚠️ חוסם את כל השרת: חישוב CPU כבד על ה-thread הראשי
// for (let i = 0; i < 1e10; i++) {}`, lang: "typescript",
      points: ["I/O לא חוסם, אבל CPU כבד כן חוסם את כל הבקשות.", "Promise.all נכשל מהר: אם אחד נכשל, כולו נכשל. Promise.allSettled מחכה לכולם.", "תמיד await או return ל-Promise. Promise 'צף' מסתיר שגיאות."],
      task: `<p>כתבי <code>fetchAll(urls: string[])</code> שמביאה את כל הכתובות במקביל עם <code>fetch</code>, מחזירה את ה-status של כל אחת, ולא נכשלת אם אחת נופלת (רמז: allSettled). מדדי זמן עם <code>console.time</code> בגרסה סדרתית ובגרסה מקבילית.</p>` }
  ],
  project: { title: "שלב 1: TaskFlow CLI", desc: "סקריפט שקורא קובץ JSON של משימות ומפיק דוח.", steps: ["קובץ data/tasks.json עם 20 משימות לדוגמה", "טיפוסים מלאים ב-src/types.ts, עם strict mode", "פקודה npm run report שמדפיסה: ספירה לפי status, משימות באיחור, ועומס לפי משתמש", "קריאת הקובץ עם fs/promises (async)"] },
  quiz: [
    { q: "מה יודפס? console.log(0 || 5, 0 ?? 5)", opts: ["5 5", "0 0", "5 0", "0 5"], a: 2, why: "|| מחליף כל ערך falsy (גם 0), ו-?? מחליף רק null/undefined." },
    { q: "למה לולאה כבדה של חישוב פוגעת בכל המשתמשים של שרת Node?", opts: ["כי היא צורכת זיכרון", "כי Node מריץ JS על thread אחד, והלולאה חוסמת את ה-event loop", "כי TypeScript איטי", "היא לא פוגעת"], a: 1, why: "בזמן שהלולאה רצה, אף callback אחר לא יכול לרוץ. לעבודת CPU משתמשים ב-worker threads או בשירות נפרד." },
    { q: "מה ההבדל בין type ל-unknown לבין any?", opts: ["אין הבדל", "unknown מכריח בדיקת טיפוס לפני שימוש, any מכבה את הבדיקות", "any בטוח יותר", "unknown קיים רק ב-Python"], a: 1, why: "any = ויתור על TypeScript. unknown = 'אני לא יודעת עדיין, אבדוק'." },
    { q: "שתי קריאות DB בלתי תלויות. איך הכי נכון להריץ אותן?", opts: ["await אחרי await", "Promise.all", "setTimeout", "לולאת for"], a: 1, why: "Promise.all מריץ במקביל, והזמן הכולל הוא של הקריאה הארוכה ולא הסכום." }
  ],
  interview: [
    { q: "הסבירי את ה-Event Loop ב-Node.js", a: "Thread יחיד מריץ JS. פעולות I/O נשלחות ל-libuv או למערכת ההפעלה, וכשהן מסתיימות ה-callback נכנס לתור. ה-loop מריץ קודם microtasks (Promises) ואחר כך macrotasks (timers, I/O). לכן Node מצוין ל-I/O ופחות טוב ל-CPU." },
    { q: "מה ההבדל בין interface ל-type?", a: "שניהם מתארים צורות. interface ניתן להרחבה ול-declaration merging. type תומך ב-unions וב-mapped types. בפועל: עקביות בפרויקט." },
    { q: "Promise.all מול Promise.allSettled?", a: "all נכשל ברגע שאחד נכשל. allSettled מחזיר את התוצאה של כולם, עם status לכל אחד." }
  ]
},
{
  id: "m2", title: "Node.js מבפנים", sub: "Runtime, קבצים, שרת HTTP גולמי וקונפיגורציה",
  intro: "לפני שנשתמש ב-framework, נבנה שרת עם המודולים של Node בלבד. כך Express לא ירגיש כמו קסם, ותביני מה הוא עושה בשבילך.",
  lessons: [
    { id: "m2l1", title: "מה זה Node.js?", min: 30,
      goals: ["להכיר את V8 ו-libuv", "לדעת מתי Node מתאים ומתי לא"],
      body: `<p>Node.js הוא <b>runtime</b>: סביבה שמריצה JavaScript מחוץ לדפדפן. הוא מורכב מ:</p>
<ul><li><b>V8</b> – מנוע ה-JS של Chrome, שמקמפל JS לקוד מכונה.</li><li><b>libuv</b> – ספריית C שמנהלת את ה-event loop, I/O אסינכרוני ו-thread pool (לקבצים, DNS, crypto).</li><li><b>מודולים מובנים</b>: <code>http</code>, <code>fs</code>, <code>crypto</code>, <code>path</code>, <code>events</code>.</li></ul>
<p><b>מתאים ל:</b> APIs, real-time, שירותים שעיקר עבודתם I/O. <b>פחות מתאים ל:</b> עיבוד וידאו, ML ועבודת CPU כבדה. שם עדיף Python/Go, או worker threads.</p>`,
      code: `// globals שימושיים
console.log(process.version);      // גרסת Node
console.log(process.env.PORT);     // משתני סביבה
console.log(process.argv);         // ארגומנטים משורת הפקודה
console.log(import.meta.dirname);  // התיקייה של הקובץ הנוכחי

process.on("SIGTERM", () => {
  console.log("shutting down");
  process.exit(0);
});`, lang: "typescript",
      points: ["Node = V8 + libuv + ספריית סטנדרט.", "process הוא האובייקט שמחבר אותך למערכת ההפעלה.", "Node הוא single-threaded לגבי JS, אבל libuv משתמש ב-threads מאחורי הקלעים."],
      task: `<p>כתבי סקריפט שמדפיס את כל משתני הסביבה שמתחילים ב-<code>NODE</code> או ב-<code>npm_</code>, והריצי אותו דרך <code>npm run</code>. מה ההבדל לעומת הרצה ישירה?</p>` },
    { id: "m2l2", title: "קבצים ו-Streams", min: 40,
      goals: ["לקרוא ולכתוב קבצים אסינכרונית", "להבין למה streams חשובים לזיכרון"],
      body: `<p>את <code>fs/promises</code> תשתמשי בו לקבצים קטנים. לקבצים גדולים (לוגים, CSV של מיליון שורות) קוראים ב-<b>streams</b>: חתיכה אחרי חתיכה, בלי לטעון את כל הקובץ לזיכרון.</p>
<p>Streams נמצאים בכל מקום ב-Node: גם בקשת HTTP וגם תשובת HTTP הם streams.</p>`,
      code: `import { readFile, writeFile } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";

// קובץ קטן
const tasks = JSON.parse(await readFile("data/tasks.json", "utf8"));
await writeFile("out.json", JSON.stringify(tasks, null, 2));

// קובץ ענק: שורה אחרי שורה
const rl = createInterface({ input: createReadStream("big.log") });
let errors = 0;
for await (const line of rl) {
  if (line.includes("ERROR")) errors++;
}
console.log({ errors });`, lang: "typescript",
      points: ["אל תשתמשי ב-readFileSync בתוך שרת, כי זה חוסם.", "for await...of עובד על streams.", "Backpressure: stream יודע להאט כשהצד השני לא מספיק לקרוא."],
      task: `<p>צרי קובץ לוג של 1,000,000 שורות (סקריפט קטן), וכתבי שתי גרסאות שסופרות שגיאות: עם readFile ועם stream. השווי את צריכת הזיכרון בעזרת <code>process.memoryUsage().heapUsed</code>.</p>` },
    { id: "m2l3", title: "שרת HTTP בלי Framework", min: 50,
      goals: ["לבנות שרת עם המודול http", "לטפל ב-routing, ב-JSON body ובשגיאות ידנית"],
      body: `<p>שרת HTTP ב-Node הוא פונקציה שמקבלת <code>req</code> ו-<code>res</code> לכל בקשה. כל השאר, כמו routing, פענוח JSON וטיפול בשגיאות, עלייך. בדיוק את זה Express יעשה בשבילך בהמשך.</p>`,
      code: `import { createServer } from "node:http";

const tasks: { id: number; title: string }[] = [];

async function readJson(req: import("node:http").IncomingMessage) {
  let body = "";
  for await (const chunk of req) body += chunk;
  return body ? JSON.parse(body) : {};
}

const server = createServer(async (req, res) => {
  const send = (status: number, data: unknown) => {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  };
  try {
    if (req.method === "GET" && req.url === "/health") return send(200, { ok: true });
    if (req.method === "GET" && req.url === "/tasks") return send(200, tasks);
    if (req.method === "POST" && req.url === "/tasks") {
      const { title } = await readJson(req);
      if (!title) return send(400, { error: "title is required" });
      const task = { id: tasks.length + 1, title };
      tasks.push(task);
      return send(201, task);
    }
    send(404, { error: "not found" });
  } catch {
    send(500, { error: "internal error" });
  }
});

server.listen(3000, () => console.log("http://localhost:3000"));`, lang: "typescript",
      points: ["ה-body מגיע כ-stream, ולכן צריך לאסוף אותו.", "בלי try/catch, שגיאה אחת יכולה להפיל את התהליך.", "שימי לב כמה if-ים נדרשו. זו הסיבה ש-frameworks קיימים."],
      task: `<p>הוסיפי לשרת <code>GET /tasks/:id</code> ו-<code>DELETE /tasks/:id</code> (רמז: <code>req.url.split("/")</code>). בדקי את כל הנתיבים עם curl, כולל מקרי שגיאה.</p>` },
    { id: "m2l4", title: "קונפיגורציה ומשתני סביבה", min: 30,
      goals: ["להפריד קונפיגורציה מקוד", "לטעון ולוודא env vars בעליית השרת"],
      body: `<p>לפי עקרון <b>12-Factor App</b>, קונפיגורציה (פורט, כתובת DB, סודות) נמצאת במשתני סביבה ולא בקוד. כך אותו קוד רץ במחשב שלך, ב-staging ובפרודקשן.</p>
<p>בפיתוח שמים את הערכים בקובץ <code>.env</code>, שלעולם לא נכנס ל-Git. מוסיפים ריפו קובץ <code>.env.example</code> שמתעד אילו משתנים צריך. חשוב לוודא את כל המשתנים בעליית השרת (fail fast).</p>`,
      code: `// node --env-file=.env src/index.ts  (Node 20.6+)
// src/config.ts
import { z } from "zod";

const Env = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
});

export const config = Env.parse(process.env); // נכשל מיד אם חסר משהו`, lang: "typescript",
      points: ["סוד ב-Git = סוד שדלף, גם אם מחקת אותו אחר כך.", "Fail fast: עדיף שהשרת לא יעלה בכלל מאשר שיקרוס אחרי שעה.", "קובץ config אחד שכל הקוד מייבא ממנו."],
      task: `<p>הוסיפי לשרת קובץ <code>config.ts</code> עם ולידציה, קובץ <code>.env.example</code>, והוספה של <code>.env</code> ל-‎.gitignore. וודאי שהשרת נכשל עם הודעה ברורה אם PORT אינו מספר.</p>` }
  ],
  project: { title: "שלב 2: שרת גולמי", desc: "TaskFlow רץ כשרת HTTP אמיתי, בלי framework.", steps: ["GET /health מחזיר status וגרסה", "CRUD מלא ל-tasks בזיכרון", "קונפיגורציה מ-env, עם ולידציה", "טיפול ב-SIGTERM: סגירה מסודרת של השרת", "קובץ requests.http (REST Client) עם כל הבקשות"] },
  quiz: [
    { q: "למה לא להשתמש ב-readFileSync בתוך request handler?", opts: ["זה לא עובד ב-TypeScript", "זה חוסם את ה-event loop לכל הבקשות", "זה מוחק את הקובץ", "אין בעיה"], a: 1, why: "Sync = חסימה. כל המשתמשים מחכים עד שהקובץ נקרא." },
    { q: "איפה שומרים את ה-DATABASE_URL של פרודקשן?", opts: ["בקוד", "ב-README", "במשתנה סביבה / secret manager", "ב-package.json"], a: 2, why: "סודות לא נכנסים לקוד. בפרודקשן הם מוזרקים כמשתני סביבה, או מגיעים מ-secret manager." },
    { q: "מה התפקיד של libuv?", opts: ["קומפילציה של TypeScript", "ניהול event loop ו-I/O אסינכרוני", "ניהול חבילות", "בדיקות"], a: 1, why: "libuv היא השכבה שמאפשרת ל-Node לבצע I/O בלי לחסום." },
    { q: "מתי נעדיף stream על פני readFile?", opts: ["תמיד", "לקבצים גדולים או לתעבורה רציפה", "לקבצי JSON קטנים", "אף פעם"], a: 1, why: "Stream מעבד חתיכות, כך שצריכת הזיכרון קבועה ולא תלויה בגודל הקובץ." }
  ],
  interview: [
    { q: "מתי לא היית בוחרת ב-Node.js?", a: "לעבודה כבדה של CPU (עיבוד תמונה, ML, הצפנה כבדה) שתחסום את ה-loop. אפשר worker threads או שירות נפרד ב-Go/Python." },
    { q: "מה זה 12-Factor App?", a: "אוסף עקרונות לאפליקציות ענן. החשובים: קונפיג ב-env, תהליכים stateless, לוגים ל-stdout, ושוויון בין dev ל-prod." }
  ]
},
{
  id: "m3", title: "REST API עם Express", sub: "Routing, Middleware, ולידציה ומבנה פרויקט",
  intro: "כאן מתחיל העבודה היומיומית של מפתחת Backend. נבנה את TaskFlow v1: API מסודר, עם ולידציה, טיפול שגיאות אחיד ומבנה שכבות שאפשר לגדול איתו.",
  lessons: [
    { id: "m3l1", title: "עקרונות REST", min: 40,
      goals: ["לתכנן endpoints נכון", "להבין idempotency ובחירת status codes"],
      body: `<p>REST הוא סגנון לתכנון API סביב <b>משאבים</b> (nouns), כשה-HTTP methods הם הפעלים.</p>
<ul><li>שמות ברבים ובלי פעלים: <code>/tasks</code> ולא <code>/getTasks</code>.</li><li>קינון ליחסים: <code>/projects/42/tasks</code>.</li><li>סינון ומיון ב-query: <code>/tasks?status=open&sort=-dueDate&limit=20</code>.</li><li><b>Idempotent</b> = לבצע פעמיים זה כמו לבצע פעם אחת: GET, PUT ו-DELETE כן. POST לא.</li><li>גרסאות: <code>/v1/tasks</code>, כדי לא לשבור לקוחות קיימים.</li><li>פורמט שגיאה אחיד בכל ה-API.</li></ul>`,
      code: `GET    /v1/projects                    → 200 [projects]
POST   /v1/projects                    → 201 project
GET    /v1/projects/42                 → 200 project | 404
PATCH  /v1/projects/42                 → 200 project
DELETE /v1/projects/42                 → 204

GET    /v1/projects/42/tasks?status=open&limit=20
POST   /v1/projects/42/tasks           → 201 | 422 validation
POST   /v1/tasks/918/assign            → פעולה שאינה CRUD: מקובל

// פורמט שגיאה אחיד
{ "error": { "code": "VALIDATION_ERROR", "message": "title is required",
             "details": [{ "path": "title", "issue": "required" }] } }`, lang: "plaintext",
      points: ["תכנון API לפני קוד חוסך המון כאב.", "Idempotency קריטי כשיש retries, ונראה את זה במודול 9.", "קיימות גם אלטרנטיבות כמו GraphQL ו-gRPC. REST הוא ברירת המחדל."],
      task: `<p>כתבי <code>docs/api.md</code> עם כל ה-endpoints של TaskFlow: users, projects, members, tasks ו-comments. לכל אחד ציינו method, path, body, status codes אפשריים ומי רשאי לבצע אותו.</p>` },
    { id: "m3l2", title: "Express: נתיבים ו-Router", min: 45,
      goals: ["להקים שרת Express עם TypeScript", "לארגן נתיבים ב-Routers"],
      body: `<p>Express הוא ה-framework הוותיק והנפוץ ביותר ב-Node. יש חלופות מודרניות (Fastify, Hono, NestJS), אבל העקרונות זהים, וכמעט בכל חברה תפגשי Express.</p>
<p>הוא מספק routing עם פרמטרים (<code>:id</code>), פענוח JSON ומערכת middleware. מ-Express 5, שגיאות מתוך פונקציות async נתפסות אוטומטית.</p>`,
      py: `# FastAPI
@app.get("/tasks/{task_id}")
async def get_task(task_id: int):
    ...`,
      code: `import express from "express";

const app = express();
app.use(express.json());

const tasksRouter = express.Router();

tasksRouter.get("/", async (req, res) => {
  const { status } = req.query;
  res.json(await taskService.list({ status: status as string | undefined }));
});

tasksRouter.get("/:id", async (req, res) => {
  const task = await taskService.get(Number(req.params.id));
  if (!task) return res.status(404).json({ error: { code: "NOT_FOUND" } });
  res.json(task);
});

tasksRouter.post("/", async (req, res) => {
  const task = await taskService.create(req.body);
  res.status(201).location(\`/v1/tasks/\${task.id}\`).json(task);
});

app.use("/v1/tasks", tasksRouter);
app.listen(3000);`, lang: "typescript",
      points: ["req.params = חלקים מהנתיב. req.query = query string. req.body = תוכן.", "כל מה שמגיע ב-params וב-query הוא string.", "Router לכל משאב, ואחר כך app.use מחבר אותם."],
      task: `<p>התקיני <code>express</code> ו-<code>@types/express</code>, והעבירי את השרת הגולמי מהמודול הקודם ל-Express. השווי כמה שורות קוד חסכת.</p>` },
    { id: "m3l3", title: "Middleware וטיפול בשגיאות", min: 50,
      goals: ["להבין את שרשרת ה-middleware", "לבנות error handler מרכזי ומחלקות שגיאה"],
      body: `<p><b>Middleware</b> היא פונקציה <code>(req, res, next)</code> שרצה לפני ה-handler. היא יכולה לשנות את req, לעצור את הבקשה או להעביר הלאה עם <code>next()</code>. כך עובדים logging, אימות, CORS ו-rate limiting.</p>
<p>Middleware עם 4 פרמטרים <code>(err, req, res, next)</code> הוא <b>error handler</b>. מגדירים אחד, בסוף. כל הקוד זורק שגיאות, והוא מתרגם אותן לתשובות HTTP.</p>`,
      code: `// שגיאות אפליקטיביות עם status
export class AppError extends Error {
  constructor(public status: number, public code: string, message: string) {
    super(message);
  }
}
export const NotFound = (what: string) => new AppError(404, "NOT_FOUND", \`\${what} not found\`);

// middleware: מדידת זמן בקשה
app.use((req, res, next) => {
  const start = performance.now();
  res.on("finish", () =>
    console.log(req.method, req.originalUrl, res.statusCode, \`\${(performance.now() - start).toFixed(1)}ms\`));
  next();
});

// ... routes ...

// error handler: אחרון!
app.use((err: unknown, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.status).json({ error: { code: err.code, message: err.message } });
  }
  console.error(err);
  res.status(500).json({ error: { code: "INTERNAL", message: "Something went wrong" } });
});`, lang: "typescript",
      points: ["הסדר של app.use קובע את הסדר של ההרצה.", "לעולם לא להחזיר stack trace ללקוח בפרודקשן.", "Service זורק AppError, וה-handler המרכזי מתרגם אותה. אין try/catch בכל route."],
      task: `<p>הוסיפי middleware שמצמיד לכל בקשה <code>requestId</code> (<code>crypto.randomUUID()</code>), מחזיר אותו ב-header <code>X-Request-Id</code> וכולל אותו בכל לוג. נחזור לזה במודול ה-Observability.</p>` },
    { id: "m3l4", title: "ולידציה עם Zod", min: 40,
      goals: ["לוודא כל קלט שמגיע מבחוץ", "להפיק טיפוסי TypeScript מסכמות"],
      body: `<p>הטיפוסים של TypeScript לא קיימים בזמן ריצה, ולכן <code>req.body</code> יכול להיות כל דבר. <b>Zod</b> מגדיר סכמה שמוודאת את הקלט בזמן ריצה, וגם מפיקה ממנה את הטיפוס. מקור אמת אחד, כמו Pydantic ב-FastAPI.</p>`,
      py: `from pydantic import BaseModel, Field
class CreateTask(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    priority: Literal["low","medium","high"] = "medium"`,
      code: `import { z } from "zod";

export const CreateTask = z.object({
  title: z.string().trim().min(1).max(200),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  dueDate: z.coerce.date().optional(),
  assigneeId: z.number().int().positive().nullable().default(null),
});
export type CreateTaskInput = z.infer<typeof CreateTask>;

// middleware גנרי
export const validate = (schema: z.ZodTypeAny) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(422).json({ error: { code: "VALIDATION_ERROR", details: result.error.issues } });
    }
    req.body = result.data;
    next();
  };

tasksRouter.post("/", validate(CreateTask), async (req, res) => { /* req.body כבר נקי */ });`, lang: "typescript",
      points: ["Never trust the client. כל קלט עובר ולידציה.", "z.infer = טיפוס בחינם מתוך הסכמה.", "ולדי גם את query ואת params, לא רק את body."],
      task: `<p>הוסיפי סכמות ל-<code>CreateTask</code>, ל-<code>UpdateTask</code> (כל השדות אופציונליים, רמז: <code>.partial()</code>) ול-<code>ListTasksQuery</code> (status, limit בין 1 ל-100, offset).</p>` },
    { id: "m3l5", title: "מבנה פרויקט בשכבות", min: 40,
      goals: ["להפריד routes, services ו-repositories", "להבין למה זה מקל על בדיקות ושינויים"],
      body: `<p>כשהפרויקט גדל, שמים כל דבר במקום שלו:</p>
<ul><li><b>Routes/Controllers</b> – HTTP בלבד: קוראים קלט, קוראים ל-service ומחזירים תשובה.</li><li><b>Services</b> – לוגיקה עסקית: "אי אפשר לסגור משימה בפרויקט בארכיון". השכבה הזו לא יודעת שקיים HTTP.</li><li><b>Repositories</b> – גישה לנתונים: SQL ו-ORM.</li></ul>
<p>היתרון: אפשר להחליף DB בלי לגעת בלוגיקה, ולבדוק את ה-service בלי שרת. מבנה <b>לפי פיצ'ר</b> (תיקייה לכל משאב) עדיף על מבנה לפי סוג קובץ.</p>`,
      code: `src/
├── app.ts               # יצירת app, middlewares, routers
├── server.ts            # listen + graceful shutdown
├── config.ts
├── lib/
│   ├── errors.ts
│   └── validate.ts
└── modules/
    ├── tasks/
    │   ├── tasks.routes.ts
    │   ├── tasks.service.ts
    │   ├── tasks.repository.ts
    │   ├── tasks.schemas.ts
    │   └── tasks.test.ts
    ├── projects/
    └── users/`, lang: "plaintext",
      points: ["הפרדה בין app.ts ל-server.ts מאפשרת לבדוק את ה-app בלי לפתוח פורט.", "Service לא מקבל req/res.", "זה מבנה שמראיינים אוהבים לראות בפרויקט בית."],
      task: `<p>ארגני מחדש את TaskFlow לפי המבנה הזה. שימי את ה-repository בזיכרון (Map), כך שבמודול הבא נחליף רק אותו ב-Postgres.</p>` }
  ],
  project: { title: "שלב 3: TaskFlow API v1", desc: "API מלא בזיכרון, מסודר בשכבות.", steps: ["CRUD ל-projects ול-tasks תחת /v1", "ולידציה עם Zod לכל body ו-query", "Error handler מרכזי ופורמט שגיאה אחיד", "Pagination עם limit/offset וסינון לפי status", "Request ID ו-logging middleware", "docs/api.md מעודכן"] },
  quiz: [
    { q: "איזה status מתאים כש-body לא עובר ולידציה?", opts: ["200", "400 או 422", "404", "500"], a: 1, why: "זו טעות של הלקוח. 422 מציין שהתחביר תקין אבל התוכן לא, ו-400 כללי יותר. שניהם מקובלים, העיקר עקביות." },
    { q: "איפה צריכה לשבת הבדיקה 'אי אפשר להקצות משימה למשתמש שאינו חבר בפרויקט'?", opts: ["ב-route", "ב-service", "ב-repository", "בלקוח"], a: 1, why: "זו לוגיקה עסקית, ולכן service. כך היא נאכפת לא משנה מי קורא לה." },
    { q: "איזה method אינו idempotent?", opts: ["GET", "PUT", "DELETE", "POST"], a: 3, why: "שני POST-ים זהים יוצרים שני משאבים." },
    { q: "למה צריך Zod אם יש TypeScript?", opts: ["לא צריך", "כי טיפוסי TS נמחקים בזמן ריצה, וקלט חיצוני לא מוודא", "Zod מהיר יותר", "בשביל עיצוב"], a: 1, why: "TS בודק את הקוד שלך, לא את מה שהמשתמשים שולחים." }
  ],
  interview: [
    { q: "איך היית מתכננת pagination ל-API?", a: "Offset/limit פשוט, אבל איטי בעמודים עמוקים ולא יציב כשמתווספים נתונים. Cursor-based (לפי id או timestamp) יציב ומהיר. מחזירים nextCursor. פירוט במודול 8." },
    { q: "מה זה middleware?", a: "פונקציה בשרשרת שמטפלת בבקשה לפני או אחרי ה-handler. משמשת ל-cross-cutting concerns: auth, logging, CORS, rate limit ושגיאות." },
    { q: "איך מטפלים בשגיאות ב-Express בצורה נקייה?", a: "מחלקות שגיאה עם status, זריקה מה-service, ו-error middleware אחד שממפה לתשובה. בלי stack traces ללקוח, ועם לוג מלא בשרת." }
  ]
},
{
  id: "m4", title: "בסיסי נתונים", sub: "PostgreSQL, מודל נתונים, ORM, אינדקסים וטרנזקציות",
  intro: "את כבר מכירה SQL, אז נתמקד במה שמפתחת Backend צריכה: תכנון סכמה, עבודה מקוד, ביצועים ונכונות כשיש הרבה משתמשים במקביל.",
  lessons: [
    { id: "m4l1", title: "PostgreSQL ותכנון סכמה", min: 50,
      goals: ["להריץ Postgres ב-Docker", "לתכנן את הסכמה של TaskFlow עם קשרים ואילוצים"],
      body: `<p>PostgreSQL הוא ברירת המחדל המודרנית ל-DB רלציוני: אמין, עשיר בפיצ'רים (JSONB, full-text search) וחינמי.</p>
<p>עקרונות תכנון:</p>
<ul><li>לכל טבלה <b>Primary Key</b>.</li><li>קשרים עם <b>Foreign Keys</b>. ה-DB אוכף שלמות.</li><li>Many-to-many דרך טבלת קישור (<code>project_members</code>).</li><li><b>אילוצים</b>: <code>NOT NULL</code>, ‏<code>UNIQUE</code>, ‏<code>CHECK</code>. מה שה-DB אוכף לא יישבר מבאג בקוד.</li><li><code>created_at</code> ו-<code>updated_at</code> בכל טבלה.</li></ul>`,
      code: `-- docker run --name pg -e POSTGRES_PASSWORD=dev -p 5432:5432 -d postgres:17

CREATE TABLE users (
  id            BIGSERIAL PRIMARY KEY,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE projects (
  id         BIGSERIAL PRIMARY KEY,
  name       TEXT NOT NULL,
  owner_id   BIGINT NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE project_members (
  project_id BIGINT REFERENCES projects(id) ON DELETE CASCADE,
  user_id    BIGINT REFERENCES users(id) ON DELETE CASCADE,
  role       TEXT NOT NULL CHECK (role IN ('owner','admin','member')),
  PRIMARY KEY (project_id, user_id)
);

CREATE TABLE tasks (
  id          BIGSERIAL PRIMARY KEY,
  project_id  BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open','in_progress','done')),
  assignee_id BIGINT REFERENCES users(id),
  due_date    TIMESTAMPTZ,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);`, lang: "sql",
      points: ["TIMESTAMPTZ תמיד, ושמירה ב-UTC.", "ON DELETE CASCADE מוחק תלויים. השתמשי בזה בזהירות.", "טבלת קישור עם PK מורכב מונעת כפילויות."],
      task: `<p>הריצי Postgres ב-Docker, התחברי עם <code>psql</code> או DBeaver, צרי את הטבלאות, והוסיפי טבלת <code>comments</code>. כתבי שאילתה: "כל המשימות הפתוחות בפרויקטים שאני חברה בהם, עם שם הפרויקט".</p>` },
    { id: "m4l2", title: "SQL שמפתחת Backend צריכה", min: 40,
      goals: ["לרענן JOIN, GROUP BY ו-subqueries", "להכיר window functions ו-upsert"],
      body: `<p>רענון ממוקד של מה שמופיע כל יום בעבודה ובראיונות:</p>
<ul><li><code>LEFT JOIN</code> מול <code>INNER JOIN</code>: מה קורה כשאין התאמה.</li><li><code>GROUP BY</code> + <code>HAVING</code>.</li><li><b>Window functions</b>: דירוג בתוך קבוצה, בלי לאבד שורות.</li><li><b>Upsert</b>: <code>INSERT ... ON CONFLICT</code>.</li><li><code>RETURNING</code> – לקבל את השורה שנוצרה, בלי שאילתה נוספת.</li></ul>`,
      code: `-- כמה משימות פתוחות לכל משתמש, רק מי שיש לו יותר מ-5
SELECT u.email, COUNT(t.id) AS open_tasks
FROM users u
LEFT JOIN tasks t ON t.assignee_id = u.id AND t.status = 'open'
GROUP BY u.id
HAVING COUNT(t.id) > 5
ORDER BY open_tasks DESC;

-- 3 המשימות האחרונות בכל פרויקט
SELECT * FROM (
  SELECT t.*, ROW_NUMBER() OVER (PARTITION BY project_id ORDER BY created_at DESC) AS rn
  FROM tasks t
) x WHERE rn <= 3;

-- הוספת חבר לפרויקט או עדכון תפקיד
INSERT INTO project_members (project_id, user_id, role)
VALUES (42, 7, 'admin')
ON CONFLICT (project_id, user_id) DO UPDATE SET role = EXCLUDED.role
RETURNING *;`, lang: "sql",
      points: ["תנאי ב-ON של LEFT JOIN שונה מתנאי ב-WHERE. זו שאלת ראיון נפוצה!", "window functions = GROUP BY בלי לכווץ שורות.", "RETURNING חוסך round-trip."],
      task: `<p>כתבי שאילתות: (1) פרויקטים בלי אף משימה פתוחה. (2) אחוז המשימות שהושלמו בכל פרויקט. (3) לכל משתמש, המשימה הכי דחופה שלו (window function).</p>` },
    { id: "m4l3", title: "ORM עם Prisma", min: 50,
      goals: ["להגדיר סכמה ומיגרציות", "לכתוב שאילתות type-safe מהקוד"],
      body: `<p>ORM ממפה טבלאות לאובייקטים בקוד. <b>Prisma</b> פופולרי מאוד ב-TS: מגדירים סכמה בקובץ אחד, והוא מייצר מיגרציות SQL ו-client עם טיפוסים מלאים. חלופות: Drizzle (קרוב יותר ל-SQL) ו-Kysely.</p>
<p><b>מיגרציה</b> = קובץ SQL עם גרסה שמשנה את הסכמה. היא נכנסת ל-Git ורצה בכל סביבה. לעולם לא משנים סכמה ידנית בפרודקשן.</p>`,
      py: `# SQLAlchemy
tasks = session.query(Task).filter(Task.project_id == 42, Task.status == "open").all()`,
      code: `// prisma/schema.prisma
model Task {
  id         Int        @id @default(autoincrement())
  title      String
  status     TaskStatus @default(open)
  project    Project    @relation(fields: [projectId], references: [id], onDelete: Cascade)
  projectId  Int
  assignee   User?      @relation(fields: [assigneeId], references: [id])
  assigneeId Int?
  createdAt  DateTime   @default(now())
  @@index([projectId, status])
}
enum TaskStatus { open in_progress done }

// npx prisma migrate dev --name add_tasks

// tasks.repository.ts
export const tasksRepo = {
  list: (projectId: number, status?: TaskStatus) =>
    prisma.task.findMany({
      where: { projectId, ...(status && { status }) },
      include: { assignee: { select: { id: true, email: true } } },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
  create: (data: Prisma.TaskUncheckedCreateInput) => prisma.task.create({ data }),
};`, lang: "typescript",
      points: ["מיגרציות הן קוד: review, גרסאות ו-Git.", "include/select מונעים N+1 ומביאים רק מה שצריך.", "תמיד כדאי לדעת איזה SQL ה-ORM מייצר (log: ['query'])."],
      task: `<p>החליפי את ה-repository בזיכרון ב-Prisma מעל Postgres. ה-services וה-routes לא אמורים להשתנות כמעט בכלל. זו ההוכחה שהשכבות עובדות.</p>` },
    { id: "m4l4", title: "אינדקסים וביצועי שאילתות", min: 50,
      goals: ["להבין איך אינדקס B-tree עובד", "לקרוא EXPLAIN ANALYZE ולבחור אינדקסים"],
      body: `<p>בלי אינדקס, Postgres סורק את כל הטבלה (<b>Seq Scan</b>), ולכן החיפוש הוא O(n). אינדקס <b>B-tree</b> הוא עץ ממוין שמאפשר חיפוש ב-O(log n).</p>
<ul><li>אינדקס על עמודות שמופיעות ב-WHERE, ב-JOIN וב-ORDER BY.</li><li><b>אינדקס מורכב</b> <code>(project_id, status)</code> עוזר ל-WHERE על project_id לבד, או על שתי העמודות. הוא לא עוזר ל-status לבד. הסדר חשוב.</li><li>מחיר: כל אינדקס מאט כתיבות ותופס מקום.</li><li>PK ו-UNIQUE מקבלים אינדקס אוטומטית. FK <b>לא</b>.</li></ul>`,
      code: `EXPLAIN ANALYZE
SELECT * FROM tasks WHERE project_id = 42 AND status = 'open'
ORDER BY created_at DESC LIMIT 20;
-- Seq Scan on tasks  (cost=0..25000 rows=...) (actual time=180ms)

CREATE INDEX CONCURRENTLY idx_tasks_project_status_created
  ON tasks (project_id, status, created_at DESC);

-- Index Scan using idx_tasks_project_status_created (actual time=0.08ms)

-- partial index: רק משימות פתוחות
CREATE INDEX idx_tasks_open_due ON tasks (due_date) WHERE status <> 'done';`, lang: "sql",
      points: ["CONCURRENTLY בפרודקשן, כדי לא לנעול את הטבלה.", "מודדים לפני ואחרי. לא מוסיפים אינדקסים לפי תחושה.", "אינדקס על FK חשוב ל-JOIN ול-DELETE CASCADE."],
      task: `<p>הכניסי 1,000,000 משימות (<code>generate_series</code>). מדדי את השאילתה של רשימת משימות לפרויקט לפני ואחרי אינדקס, ושמרי את פלט ה-EXPLAIN ב-<code>notes/indexes.md</code>.</p>` },
    { id: "m4l5", title: "טרנזקציות ו-Race Conditions", min: 50,
      goals: ["להבין ACID ורמות isolation", "לזהות ולמנוע race conditions"],
      body: `<p><b>טרנזקציה</b> = כמה פעולות שמצליחות או נכשלות יחד. <b>ACID</b>: Atomicity, Consistency, Isolation, Durability.</p>
<p>הבעיה הקלאסית: שתי בקשות קוראות ערך, שתיהן מחליטות על סמך מה שקראו ושתיהן כותבות. למשל: "לכל פרויקט חינמי מותר עד 100 משימות", ושתי בקשות במקביל רואות 99 משימות.</p>
<p>פתרונות: אילוץ ב-DB, עדכון אטומי (<code>UPDATE ... SET n = n + 1</code>), נעילה (<code>SELECT ... FOR UPDATE</code>), או optimistic locking עם עמודת version.</p>`,
      code: `// טרנזקציה עם Prisma + נעילת שורה
await prisma.$transaction(async (tx) => {
  const [project] = await tx.$queryRaw<{ task_count: number }[]>\`
    SELECT task_count FROM projects WHERE id = \${projectId} FOR UPDATE\`;
  if (project.task_count >= 100) throw new AppError(409, "LIMIT", "Task limit reached");
  await tx.task.create({ data: { projectId, title } });
  await tx.project.update({ where: { id: projectId }, data: { taskCount: { increment: 1 } } });
});

// optimistic locking: עדכון רק אם אף אחד לא שינה בינתיים
const updated = await prisma.task.updateMany({
  where: { id, version: input.version },
  data: { ...input.changes, version: { increment: 1 } },
});
if (updated.count === 0) throw new AppError(409, "CONFLICT", "Task was modified");`, lang: "typescript",
      points: ["Read-modify-write בלי הגנה = באג שיופיע רק בעומס.", "טרנזקציות קצרות. אסור לקרוא ל-API חיצוני מתוך טרנזקציה.", "ברירת המחדל ב-Postgres היא READ COMMITTED."],
      task: `<p>כתבי סקריפט ששולח 50 בקשות POST במקביל לפרויקט שקרוב למגבלה (Promise.all). הראי שבלי הגנה המגבלה נשברת, ושעם <code>FOR UPDATE</code> היא נשמרת.</p>` },
    { id: "m4l6", title: "SQL מול NoSQL", min: 30,
      goals: ["להכיר סוגי DB", "לדעת לנמק בחירה בראיון"],
      body: `<ul><li><b>רלציוני</b> (Postgres, MySQL): נתונים מובנים, קשרים, טרנזקציות. ברירת מחדל.</li><li><b>Document</b> (MongoDB): מסמכי JSON גמישים, נוח כשהסכמה משתנה ואין הרבה JOINs.</li><li><b>Key-Value</b> (Redis, DynamoDB): מהיר מאוד לגישה לפי מפתח. cache, sessions, ספירות.</li><li><b>Wide-column</b> (Cassandra): כמויות כתיבה עצומות, scale אופקי.</li><li><b>Search</b> (Elasticsearch/OpenSearch): חיפוש טקסט חופשי.</li><li><b>Time-series / Vector</b>: מטריקות, embeddings ל-AI (pgvector).</li></ul>
<p>בראיון: התחילי מ-Postgres, ונמקי מעבר רק כשיש דרישה ספציפית: היקף כתיבות, גמישות סכמה או latency.</p>`,
      code: `// MongoDB: משימה עם תגובות מוטמעות
{
  _id: ObjectId("..."),
  projectId: 42,
  title: "Write spec",
  comments: [ { by: 7, text: "on it", at: ISODate("...") } ]
}

// Redis
SET session:abc123 "{userId:7}" EX 3600
INCR rate:user:7:2026-11-20T10:15`, lang: "javascript",
      points: ["NoSQL ≠ בלי סכמה. הסכמה פשוט עוברת לקוד.", "Postgres עם JSONB מכסה הרבה מקרים של document store.", "Polyglot persistence: מערכות גדולות משתמשות בכמה סוגי DB."],
      task: `<p>לכל אחד מהמקרים בחרי DB ונמקי בשתי שורות: עגלת קניות, פיד אירועים של IoT, חיפוש מוצרים, מערכת בנקאית, ספירת צפיות.</p>` }
  ],
  project: { title: "שלב 4: TaskFlow על Postgres", desc: "נתונים אמיתיים ונשמרים.", steps: ["Postgres ב-Docker, ו-Prisma עם מיגרציות ב-Git", "טבלאות users, projects, project_members, tasks, comments", "Repositories מעל Prisma, בלי שינוי ב-services", "Seed script עם נתוני דמו", "אינדקסים לשאילתות העיקריות, עם EXPLAIN מתועד", "טרנזקציה ביצירת פרויקט (פרויקט + חברות owner)"] },
  quiz: [
    { q: "יש אינדקס על (project_id, status). איזו שאילתה לא תפיק ממנו תועלת?", opts: ["WHERE project_id = 1", "WHERE project_id = 1 AND status = 'open'", "WHERE status = 'open'", "כולן ירוויחו"], a: 2, why: "אינדקס מורכב עובד משמאל לימין (leftmost prefix)." },
    { q: "מה הבעיה ב: const t = await get(id); t.views++; await save(t)?", opts: ["אין בעיה", "Race condition: עדכונים מקבילים יידרסו", "Syntax error", "זה איטי מדי"], a: 1, why: "שתי בקשות קוראות 10 ושתיהן כותבות 11. צריך UPDATE ... SET views = views + 1." },
    { q: "מה ה-A ב-ACID?", opts: ["Availability", "Atomicity", "Async", "Accuracy"], a: 1, why: "Atomicity: הכול או כלום." },
    { q: "האם Postgres יוצר אינדקס אוטומטית על Foreign Key?", opts: ["כן", "לא", "רק ב-UNIQUE", "רק ב-Prisma"], a: 1, why: "לא! צריך ליצור אותו ידנית. זו טעות נפוצה." }
  ],
  interview: [
    { q: "איך היית מאבחנת שאילתה איטית?", a: "EXPLAIN ANALYZE, וחיפוש של Seq Scan, הערכות שגויות של שורות ו-sort בדיסק. אחר כך אינדקס מתאים, שכתוב השאילתה, או בדיקה של N+1 בקוד. מודדים לפני ואחרי." },
    { q: "מה זה N+1?", a: "שאילתה אחת להביא N רשומות, ועוד שאילתה לכל רשומה. הפתרון: JOIN, IN (...) או include ב-ORM." },
    { q: "Optimistic מול Pessimistic locking?", a: "Pessimistic נועל מראש (FOR UPDATE), טוב כשיש הרבה התנגשויות. Optimistic בודק version בעדכון ונכשל ב-conflict, טוב כשהתנגשויות נדירות." }
  ]
},
{
  id: "m5", title: "אימות, הרשאות ואבטחה", sub: "סיסמאות, JWT, RBAC ו-OWASP",
  intro: "אבטחה היא לא פיצ'ר שמוסיפים בסוף. כאן TaskFlow יקבל משתמשים, התחברות והרשאות, ונכיר את ההתקפות הנפוצות על שרתים.",
  lessons: [
    { id: "m5l1", title: "שמירת סיסמאות", min: 35,
      goals: ["להבין hashing ו-salt", "לממש הרשמה והתחברות בטוחות"],
      body: `<p>לעולם לא שומרים סיסמה. שומרים <b>hash</b>: פונקציה חד-כיוונית. בהתחברות מחשבים את ה-hash של מה שהוקלד ומשווים.</p>
<ul><li>לא MD5 ולא SHA-256 לבד. הם מהירים מדי, ותוקף מנחש מיליארדים בשנייה.</li><li>משתמשים ב-<b>argon2</b> או <b>bcrypt</b>: איטיים בכוונה, ועם <b>salt</b> אקראי לכל משתמש, כך שאותה סיסמה יוצרת hash שונה.</li><li>הודעת שגיאה זהה ל"אימייל לא קיים" ול"סיסמה שגויה", כדי לא לחשוף אילו משתמשים קיימים.</li></ul>`,
      code: `import argon2 from "argon2";

export async function signup(email: string, password: string) {
  const passwordHash = await argon2.hash(password);
  return usersRepo.create({ email: email.toLowerCase(), passwordHash });
}

export async function login(email: string, password: string) {
  const user = await usersRepo.findByEmail(email.toLowerCase());
  const ok = user && (await argon2.verify(user.passwordHash, password));
  if (!ok) throw new AppError(401, "INVALID_CREDENTIALS", "Invalid email or password");
  return user;
}`, lang: "typescript",
      points: ["Hash ≠ הצפנה. הצפנה הפיכה, hash לא.", "אל תחזירי passwordHash ב-API. השתמשי ב-select.", "מגבלת קצב על login נגד brute force."],
      task: `<p>ממשי <code>POST /v1/auth/signup</code> ו-<code>POST /v1/auth/login</code>, עם ולידציה: אימייל תקין וסיסמה של לפחות 10 תווים. ודאי שה-hash לא מופיע באף תשובה.</p>` },
    { id: "m5l2", title: "JWT מול Sessions", min: 50,
      goals: ["להבין איך tokens עובדים", "לממש access ו-refresh tokens"],
      body: `<p>אחרי login צריך לזהות את המשתמשת בכל בקשה. שתי גישות:</p>
<ul><li><b>Session</b>: השרת שומר session ב-DB או ב-Redis ומחזיר cookie עם session id. קל לבטל (מוחקים את ה-session).</li><li><b>JWT</b>: token חתום שמכיל את ה-userId. השרת רק מוודא את החתימה, ולא צריך DB. הקושי: אי אפשר לבטל אותו לפני שפג תוקפו.</li></ul>
<p>פשרה נפוצה: <b>access token</b> קצר (15 דקות) ו-<b>refresh token</b> ארוך שנשמר ב-DB וניתן לביטול. בדפדפן עדיף cookie מסוג <code>httpOnly</code> ו-<code>Secure</code>, ולא localStorage, כי אליו JS זדוני יכול להגיע.</p>`,
      code: `import jwt from "jsonwebtoken";

export const signAccess = (userId: number) =>
  jwt.sign({ sub: String(userId) }, config.JWT_SECRET, { expiresIn: "15m" });

// middleware
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) throw new AppError(401, "UNAUTHENTICATED", "Missing token");
  try {
    const payload = jwt.verify(header.slice(7), config.JWT_SECRET) as { sub: string };
    req.user = { id: Number(payload.sub) };
    next();
  } catch {
    throw new AppError(401, "UNAUTHENTICATED", "Invalid or expired token");
  }
}

app.use("/v1/projects", requireAuth, projectsRouter);`, lang: "typescript",
      points: ["JWT חתום, לא מוצפן. כל אחד יכול לקרוא את התוכן, אז אין לשים בו סודות.", "סוד חזק וארוך, ממשתנה סביבה.", "Refresh token rotation: כל שימוש מחליף אותו בחדש."],
      task: `<p>הוסיפי JWT ל-TaskFlow. הדביקי token באתר jwt.io וראי שהתוכן קריא. בונוס: refresh tokens בטבלה, עם endpoint בשם <code>/auth/refresh</code> ו-<code>/auth/logout</code> שמבטל.</p>` },
    { id: "m5l3", title: "הרשאות (Authorization)", min: 40,
      goals: ["לממש RBAC ובדיקות בעלות", "למנוע Broken Access Control"],
      body: `<p><b>Authentication</b> = מי את. <b>Authorization</b> = מה מותר לך לעשות. הבאג הנפוץ ביותר באבטחת APIs (מספר 1 ב-OWASP) הוא שכחה לבדוק הרשאה: <code>GET /projects/43</code> מחזיר פרויקט של מישהו אחר רק כי הוחלף מספר ב-URL. זה נקרא IDOR.</p>
<p><b>RBAC</b>: לכל חבר בפרויקט יש role, ולכל role יש הרשאות. את הבדיקה עושים ב-service, ומסננים בשאילתה עצמה.</p>`,
      code: `const PERMISSIONS = {
  owner:  ["project:delete", "member:manage", "task:write", "task:read"],
  admin:  ["member:manage", "task:write", "task:read"],
  member: ["task:write", "task:read"],
} as const;

export async function assertCan(userId: number, projectId: number, perm: string) {
  const m = await membersRepo.find(projectId, userId);
  if (!m) throw new AppError(404, "NOT_FOUND", "Project not found"); // לא חושפים קיום
  if (!PERMISSIONS[m.role].includes(perm as never))
    throw new AppError(403, "FORBIDDEN", "Not allowed");
}

// רשימה: מסננים ברמת השאילתה
prisma.project.findMany({ where: { members: { some: { userId } } } });`, lang: "typescript",
      points: ["כל endpoint עם id צריך בדיקת הרשאה.", "סינון ב-WHERE עדיף על סינון אחרי השליפה.", "כתבי בדיקות אוטומטיות למקרי 'משתמש אחר' (מודול 6)."],
      task: `<p>הוסיפי roles ל-TaskFlow. נסי לגשת לפרויקט של משתמש אחר: צריך לקבל 404. נסי להוסיף חבר כ-member: צריך לקבל 403.</p>` },
    { id: "m5l4", title: "OWASP ואבטחת API", min: 45,
      goals: ["להכיר את ההתקפות הנפוצות", "להוסיף שכבות הגנה בסיסיות"],
      body: `<ul><li><b>Injection</b>: אסור לבנות SQL משרשור strings. ORM ו-parameterized queries מגינים.</li><li><b>Broken Access Control</b>: השיעור הקודם.</li><li><b>Mass assignment</b>: <code>prisma.user.update({data: req.body})</code> מאפשר לשלוח <code>role: "admin"</code>. ולידציה עם whitelist פותרת את זה.</li><li><b>Rate limiting</b>: נגד brute force ושימוש לרעה.</li><li><b>CORS</b>: אילו דומיינים של דפדפן רשאים לקרוא ל-API.</li><li><b>Security headers</b>: ספריית <code>helmet</code>.</li><li><b>Secrets</b>: לא בקוד ולא בלוגים.</li><li><b>Dependencies</b>: <code>npm audit</code>, Dependabot.</li></ul>`,
      code: `import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

app.use(helmet());
app.use(cors({ origin: ["https://app.taskflow.dev"], credentials: true }));
app.use(express.json({ limit: "100kb" }));          // הגבלת גודל body
app.use("/v1/auth", rateLimit({ windowMs: 15 * 60_000, limit: 20 }));

// ❌ SQL injection
// prisma.$queryRawUnsafe(\`SELECT * FROM users WHERE email = '\${email}'\`)
// ✅ parameterized
prisma.$queryRaw\`SELECT * FROM users WHERE email = \${email}\`;`, lang: "typescript",
      points: ["Defense in depth: כמה שכבות הגנה.", "CORS מגן על דפדפנים, לא על ה-API מפני curl.", "Logs לא כוללים סיסמאות, tokens או מספרי כרטיס."],
      task: `<p>עברי על TaskFlow עם צ'קליסט OWASP API Top 10 ותעדי ב-<code>docs/security.md</code> מה מוגן ומה לא. הוסיפי helmet, CORS ו-rate limit על auth.</p>` }
  ],
  project: { title: "שלב 5: משתמשים ואבטחה", desc: "TaskFlow מאובטח, עם משתמשים ותפקידים.", steps: ["Signup/Login עם argon2", "JWT access token ו-middleware של requireAuth", "Roles בפרויקט ו-assertCan בכל פעולה", "משתמשת רואה רק פרויקטים שהיא חברה בהם", "helmet, CORS, rate limit והגבלת body", "docs/security.md"] },
  quiz: [
    { q: "איך שומרים סיסמאות?", opts: ["מוצפנות ב-AES", "SHA-256", "argon2/bcrypt עם salt", "base64"], a: 2, why: "צריך hash איטי עם salt. SHA-256 מהיר מדי, והצפנה הפיכה." },
    { q: "משתמשת משנה את ה-URL מ-/invoices/100 ל-/invoices/101 ורואה חשבונית של מישהו אחר. איך נקראת הפגיעות?", opts: ["XSS", "IDOR / Broken Access Control", "CSRF", "DDoS"], a: 1, why: "חסרה בדיקת בעלות על המשאב." },
    { q: "מה החיסרון העיקרי של JWT ללא state?", opts: ["איטי", "קשה לבטל לפני שפג התוקף", "לא עובד במובייל", "גדול מדי"], a: 1, why: "השרת לא שומר אותו, ולכן אי אפשר 'למחוק'. פותרים עם תוקף קצר ו-refresh token." },
    { q: "האם CORS מגן על ה-API מפני סקריפט Python שקורא אליו?", opts: ["כן", "לא, CORS נאכף רק על ידי דפדפנים", "רק ב-HTTPS", "רק עם JWT"], a: 1, why: "CORS הוא מנגנון של הדפדפן. ההגנה האמיתית היא auth." }
  ],
  interview: [
    { q: "Authentication מול Authorization?", a: "AuthN: זיהוי מי את (login, token). AuthZ: בדיקה מה מותר לך (roles, בעלות)." },
    { q: "איפה לשמור token בדפדפן?", a: "httpOnly Secure SameSite cookie מונע גישה מ-JS (XSS). localStorage חשוף ל-XSS. עם cookies צריך להתגונן מ-CSRF (SameSite או CSRF token)." },
    { q: "איך מונעים SQL injection?", a: "Parameterized queries או ORM, ולעולם לא שרשור strings. בנוסף: ולידציה, והרשאות DB מינימליות." }
  ]
},
{
  id: "m6", title: "בדיקות ואיכות קוד", sub: "Vitest, Supertest, mocking ו-workflow",
  intro: "מה שמבדיל קוד של צוות מקוד של סקריפט: בדיקות שנותנות ביטחון לשנות. בראיונות שואלים על זה הרבה, ופרויקט עם בדיקות בולט מיד.",
  lessons: [
    { id: "m6l1", title: "פירמידת הבדיקות ו-Vitest", min: 40,
      goals: ["להבין סוגי בדיקות", "לכתוב unit tests ל-services"],
      body: `<ul><li><b>Unit</b>: פונקציה או service בבידוד. מהירות ורבות.</li><li><b>Integration</b>: כמה רכיבים יחד, למשל API + DB אמיתי. הכי משתלמות ב-Backend.</li><li><b>E2E</b>: המערכת כולה. מעטות ויקרות.</li></ul>
<p><b>Vitest</b> מהיר ותומך ב-TS בלי הגדרות, דומה ל-pytest. מבנה כל בדיקה: <b>Arrange, Act, Assert</b>.</p>`,
      py: `def test_overdue():
    tasks = [make_task(due="2020-01-01")]
    assert len(overdue(tasks, now)) == 1`,
      code: `import { describe, it, expect } from "vitest";
import { overdue } from "./tasks.utils.js";

describe("overdue", () => {
  const now = new Date("2026-11-20");

  it("returns open tasks past due date", () => {
    const tasks = [
      { id: 1, status: "open", dueDate: new Date("2026-11-01") },
      { id: 2, status: "done", dueDate: new Date("2026-11-01") },
      { id: 3, status: "open", dueDate: new Date("2026-12-01") },
    ];
    expect(overdue(tasks as any, now).map(t => t.id)).toEqual([1]);
  });

  it("ignores tasks without due date", () => {
    expect(overdue([{ id: 1, status: "open" }] as any, now)).toEqual([]);
  });
});`, lang: "typescript",
      points: ["לבדוק התנהגות, לא מימוש.", "שם הבדיקה הוא משפט שמתאר דרישה.", "כל באג שמתוקן מקבל בדיקה שמונעת את חזרתו."],
      task: `<p>התקיני vitest, הוסיפי <code>npm test</code>, וכתבי 8 בדיקות unit לפונקציות העזר של TaskFlow, כולל מקרי קצה.</p>` },
    { id: "m6l2", title: "בדיקות API עם Supertest", min: 50,
      goals: ["לבדוק endpoints מקצה לקצה מול DB", "לנהל DB לבדיקות"],
      body: `<p>Supertest שולח בקשות ל-<code>app</code> בלי לפתוח פורט. בגלל זה הפרדנו בין app.ts ל-server.ts. משתמשים ב-DB נפרד לבדיקות (או ב-Testcontainers), ומנקים אותו בין בדיקות.</p>
<p>הבדיקות שהכי חשוב לכתוב: מסלול הצלחה, ולידציה, 401 בלי token, ו-404/403 למשתמש אחר.</p>`,
      code: `import request from "supertest";
import { app } from "../app.js";
import { resetDb, createUserWithToken } from "../test/helpers.js";

beforeEach(resetDb);

describe("POST /v1/projects/:id/tasks", () => {
  it("creates a task for a member", async () => {
    const { token, projectId } = await createUserWithToken({ withProject: true });
    const res = await request(app)
      .post(\`/v1/projects/\${projectId}/tasks\`)
      .set("Authorization", \`Bearer \${token}\`)
      .send({ title: "Write tests" });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ title: "Write tests", status: "open" });
  });

  it("returns 404 for a non-member", async () => {
    const owner = await createUserWithToken({ withProject: true });
    const stranger = await createUserWithToken();
    const res = await request(app)
      .post(\`/v1/projects/\${owner.projectId}/tasks\`)
      .set("Authorization", \`Bearer \${stranger.token}\`)
      .send({ title: "x" });
    expect(res.status).toBe(404);
  });
});`, lang: "typescript",
      points: ["בדיקות integration מול DB אמיתי תופסות באגים שה-mocks מפספסים.", "כל בדיקה עצמאית, בלי תלות בסדר.", "Factories או helpers ליצירת נתונים."],
      task: `<p>כתבי בדיקות integration ל-auth (signup, login, token לא תקין) ולהרשאות (משתמש זר, member שמנסה פעולת admin).</p>` },
    { id: "m6l3", title: "Mocking ו-Dependency Injection", min: 40,
      goals: ["לבודד תלויות חיצוניות", "לכתוב קוד שקל לבדוק"],
      body: `<p>שירותים חיצוניים (אימייל, תשלומים, APIs) לא נקראים בבדיקות. מחליפים אותם ב-<b>mock</b> או ב-<b>fake</b>. כדי שזה יהיה קל, קוד צריך <b>לקבל</b> את התלויות שלו ולא לייבא אותן ישירות. זה נקרא Dependency Injection.</p>`,
      code: `// ממשק לתלות
export interface Mailer { send(to: string, subject: string, body: string): Promise<void>; }

export function createTaskService(deps: { repo: TasksRepo; mailer: Mailer }) {
  return {
    async assign(taskId: number, assignee: { id: number; email: string }) {
      const task = await deps.repo.update(taskId, { assigneeId: assignee.id });
      await deps.mailer.send(assignee.email, "New task", task.title);
      return task;
    },
  };
}

// בבדיקה
const mailer = { send: vi.fn().mockResolvedValue(undefined) };
const service = createTaskService({ repo: fakeRepo, mailer });
await service.assign(1, { id: 7, email: "a@b.c" });
expect(mailer.send).toHaveBeenCalledWith("a@b.c", "New task", expect.any(String));`, lang: "typescript",
      points: ["Mock רק את הגבולות של המערכת, לא כל דבר.", "יותר מדי mocks = בדיקות שעוברות כשהקוד שבור.", "DI לא דורש framework. פונקציה שמקבלת deps מספיקה."],
      task: `<p>הוסיפי ל-TaskFlow ממשק <code>Mailer</code> עם מימוש <code>ConsoleMailer</code>, ובדקי שהקצאת משימה שולחת מייל.</p>` },
    { id: "m6l4", title: "Lint, Format ו-Git Workflow", min: 30,
      goals: ["להגדיר ESLint ו-Prettier", "לעבוד עם branches, PRs ו-code review"],
      body: `<p>כלים שהופכים קוד לאחיד ומונעים ויכוחים: <b>ESLint</b> (באגים ודפוסים בעייתיים), <b>Prettier</b> (פורמט), ו-<b>tsc --noEmit</b> (בדיקת טיפוסים).</p>
<p>ה-workflow בצוות: branch לכל פיצ'ר, commits קטנים עם הודעות ברורות, PR עם תיאור, review ו-CI ירוק, ואז merge.</p>`,
      code: `// package.json
"scripts": {
  "lint": "eslint .",
  "format": "prettier --write .",
  "typecheck": "tsc --noEmit",
  "test": "vitest run",
  "check": "npm run typecheck && npm run lint && npm test"
}

# workflow
git switch -c feat/task-comments
git commit -m "feat(tasks): add comments endpoint"
git push -u origin feat/task-comments
gh pr create --fill`, lang: "bash",
      points: ["Conventional commits: feat, fix, refactor, test, docs.", "PR קטן נבדק טוב יותר מ-PR ענק.", "npm run check לפני כל push."],
      task: `<p>הגדירי ESLint, Prettier ו-script בשם <code>check</code>. מעכשיו כל שלב בפרויקט נכנס דרך PR, גם כשאת עובדת לבד.</p>` }
  ],
  project: { title: "שלב 6: בדיקות", desc: "TaskFlow עם רשת ביטחון.", steps: ["Vitest עם unit tests לפונקציות ול-services", "Supertest עם integration tests ל-auth, projects ו-tasks", "DB נפרד לבדיקות, עם reset בין בדיקות", "Mailer מוזרק, ו-mock בבדיקות", "ESLint, Prettier ו-npm run check", "Coverage מעל 70% ב-services"] },
  quiz: [
    { q: "איזה סוג בדיקה הכי משתלם ב-Backend לפי רוב הצוותים?", opts: ["E2E בלבד", "Integration מול DB אמיתי", "בדיקות ידניות", "Snapshot"], a: 1, why: "הן תופסות באגים בשאילתות, בהרשאות ובחיבורים, ועדיין מהירות יחסית." },
    { q: "למה מפרידים app.ts מ-server.ts?", opts: ["ביצועים", "כדי לבדוק את ה-app בלי לפתוח פורט", "דרישה של Express", "אבטחה"], a: 1, why: "Supertest מקבל את ה-app ישירות." },
    { q: "מה הסכנה ביותר מדי mocks?", opts: ["הבדיקות איטיות", "בדיקות עוברות גם כשהאינטגרציה האמיתית שבורה", "אין סכנה", "קוד גדול מדי"], a: 1, why: "בודקים את ה-mock ולא את המציאות." },
    { q: "מה המטרה של Dependency Injection?", opts: ["להאיץ קוד", "לאפשר החלפת תלויות (למשל בבדיקות)", "להצפין", "לחסוך זיכרון"], a: 1, why: "קוד שמקבל תלויות קל לבדוק ולהחליף." }
  ],
  interview: [
    { q: "איך היית בודקת endpoint חדש?", a: "Integration test עם בקשה אמיתית: מסלול הצלחה, ולידציה, auth ו-authz, ומקרי קצה. Unit tests ללוגיקה מורכבת ב-service." },
    { q: "מה ההבדל בין mock, stub ו-fake?", a: "Stub מחזיר ערכים קבועים. Mock גם מוודא איך קראו לו. Fake הוא מימוש עובד ופשוט, למשל repo בזיכרון." }
  ]
},
{
  id: "m7", title: "Docker, CI/CD ו-Deploy", sub: "קונטיינרים, אוטומציה וענן",
  intro: "קוד שרץ רק אצלך לא שווה הרבה. במודול הזה TaskFlow יעלה לאוויר עם pipeline אוטומטי, כמו בחברה אמיתית.",
  lessons: [
    { id: "m7l1", title: "Docker למפתחות", min: 50,
      goals: ["להבין images ו-containers", "לכתוב Dockerfile יעיל ב-multi-stage"],
      body: `<p><b>Image</b> = תבנית סגורה: מערכת הפעלה מינימלית, Node, הקוד והתלויות. <b>Container</b> = image שרץ. היתרון: "עובד אצלי" = עובד בכל מקום.</p>
<ul><li><b>Layers</b> ו-cache: מעתיקים קודם את package.json ומתקינים, ורק אחר כך את הקוד. כך שינוי בקוד לא מתקין מחדש.</li><li><b>Multi-stage</b>: שלב build עם כלי פיתוח, ושלב run קטן רק עם מה שצריך.</li><li>להריץ כמשתמש שאינו root.</li><li><code>.dockerignore</code> ל-node_modules ול-.env.</li></ul>`,
      code: `# Dockerfile
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate && npm run build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
USER node
EXPOSE 3000
CMD ["node", "dist/server.js"]

# docker build -t taskflow .
# docker run -p 3000:3000 --env-file .env taskflow`, lang: "dockerfile",
      points: ["Container הוא לא VM. הוא משתף kernel ולכן קל ומהיר.", "Image קטן = deploy מהיר ומשטח תקיפה קטן.", "קונפיגורציה מגיעה ב-env, לא בתוך ה-image."],
      task: `<p>כתבי Dockerfile ל-TaskFlow ובדקי את גודל ה-image (<code>docker images</code>). נסי לצמצם אותו מתחת ל-250MB.</p>` },
    { id: "m7l2", title: "Docker Compose", min: 35,
      goals: ["להריץ סביבה מלאה בפקודה אחת", "לנהל רשתות, volumes ו-healthchecks"],
      body: `<p>Compose מגדיר כמה containers שעובדים יחד: אפליקציה, Postgres ו-Redis. כל מפתחת חדשה בצוות מריצה <code>docker compose up</code> ומקבלת סביבה זהה. בתוך הרשת של Compose, שירותים מוצאים זה את זה לפי שם, למשל <code>postgres:5432</code>.</p>`,
      code: `# compose.yaml
services:
  api:
    build: .
    ports: ["3000:3000"]
    environment:
      DATABASE_URL: postgres://app:dev@postgres:5432/taskflow
      REDIS_URL: redis://redis:6379
      JWT_SECRET: \${JWT_SECRET}
    depends_on:
      postgres: { condition: service_healthy }
  postgres:
    image: postgres:17
    environment: { POSTGRES_USER: app, POSTGRES_PASSWORD: dev, POSTGRES_DB: taskflow }
    volumes: [pgdata:/var/lib/postgresql/data]
    healthcheck:
      test: ["CMD", "pg_isready", "-U", "app"]
      interval: 5s
  redis:
    image: redis:7-alpine
volumes:
  pgdata:`, lang: "yaml",
      points: ["Volume שומר נתונים גם כשה-container נמחק.", "depends_on עם healthcheck מחכה שה-DB יהיה מוכן באמת.", "docker compose logs -f api לראות מה קורה."],
      task: `<p>צרי <code>compose.yaml</code> שמריץ את TaskFlow, Postgres ו-Redis, והוסיפי שירות <code>migrate</code> שמריץ מיגרציות לפני ה-API.</p>` },
    { id: "m7l3", title: "CI/CD עם GitHub Actions", min: 40,
      goals: ["להריץ בדיקות אוטומטית על כל PR", "להבין את ההבדל בין CI ל-CD"],
      body: `<p><b>CI</b>: כל push או PR מריץ lint, typecheck ובדיקות. קוד שבור לא נכנס ל-main. <b>CD</b>: כל merge ל-main עולה אוטומטית לסביבה.</p>`,
      code: `# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:17
        env: { POSTGRES_PASSWORD: test, POSTGRES_DB: taskflow_test }
        ports: ["5432:5432"]
        options: --health-cmd pg_isready --health-interval 5s
    env:
      DATABASE_URL: postgres://postgres:test@localhost:5432/taskflow_test
      JWT_SECRET: test-secret-that-is-at-least-32-chars-long
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npx prisma migrate deploy
      - run: npm run check`, lang: "yaml",
      points: ["Branch protection: אי אפשר לעשות merge בלי CI ירוק.", "סודות ב-GitHub Secrets, לא ב-YAML.", "CI מהיר: cache ל-npm, ובדיקות במקביל."],
      task: `<p>הוסיפי workflow, פתחי PR עם בדיקה שנכשלת בכוונה, וראי שה-CI אדום. תקני וראי ירוק. הפעילי branch protection על main.</p>` },
    { id: "m7l4", title: "Deploy לענן", min: 50,
      goals: ["להעלות את TaskFlow לאוויר", "להכיר את שירותי הענן הבסיסיים"],
      body: `<p>להתחלה, פלטפורמות PaaS (Render, Railway, Fly.io) מעלות container מ-GitHub, עם Postgres מנוהל, בכמה קליקים. בחברות תפגשי בעיקר <b>AWS</b>, ושווה להכיר את המיפוי:</p>
<ul><li>הרצת קוד: EC2 (VM), <b>ECS/Fargate</b> (containers), Lambda (serverless), EKS (Kubernetes)</li><li>DB: <b>RDS</b> (Postgres מנוהל), DynamoDB</li><li>Cache/Queue: ElastiCache (Redis), SQS, SNS</li><li>קבצים: <b>S3</b>. CDN: CloudFront</li><li>רשת: VPC, ALB (load balancer). סודות: Secrets Manager</li></ul>
<p>בכל deploy: מיגרציות לפני הקוד החדש, health check, ו-rollback מהיר אם משהו נשבר.</p>`,
      code: `# הוספה ל-CI: deploy אחרי בדיקות על main
  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - run: curl -X POST "\${{ secrets.RENDER_DEPLOY_HOOK }}"

# בדיקת health אחרי deploy
curl -f https://taskflow-api.onrender.com/health`, lang: "yaml",
      points: ["מיגרציות צריכות להיות תואמות לאחור (expand/contract).", "Staging לפני Production.", "Kubernetes = נושא להמשך. מספיק להבין מה הוא פותר: orchestration של containers."],
      task: `<p>העלי את TaskFlow ל-Render או ל-Railway עם Postgres מנוהל, והוסיפי ל-README קישור ל-API החי. זה כבר פריט לתיק העבודות!</p>` }
  ],
  project: { title: "שלב 7: באוויר", desc: "TaskFlow חי באינטרנט עם pipeline.", steps: ["Dockerfile מסוג multi-stage, image קטן ובלי root", "compose.yaml לפיתוח מקומי (api, postgres, redis)", "GitHub Actions: lint, typecheck ו-tests על כל PR", "Branch protection על main", "Deploy אוטומטי ל-PaaS, עם DB מנוהל", "קישור חי ב-README"] },
  quiz: [
    { q: "למה מעתיקים package.json לפני שאר הקוד ב-Dockerfile?", opts: ["סדר אלפביתי", "כדי לנצל cache של layers ולא להתקין מחדש בכל שינוי קוד", "דרישה של npm", "אבטחה"], a: 1, why: "Layer משתנה רק כשהקבצים שלו משתנים." },
    { q: "מה ההבדל בין image ל-container?", opts: ["אין הבדל", "Image הוא תבנית, container הוא מופע רץ שלה", "Container גדול יותר", "Image רץ בענן בלבד"], a: 1, why: "כמו class ו-instance." },
    { q: "מה CI אמור למנוע?", opts: ["תשלום לענן", "כניסה של קוד שבור ל-main", "באגים בפרודקשן ב-100%", "שימוש ב-Git"], a: 1, why: "CI הוא שער איכות אוטומטי לכל שינוי." },
    { q: "איזה שירות AWS מתאים ל-Postgres מנוהל?", opts: ["S3", "Lambda", "RDS", "SQS"], a: 2, why: "RDS = Relational Database Service." }
  ],
  interview: [
    { q: "מה ההבדל בין container ל-VM?", a: "VM כולל מערכת הפעלה מלאה ו-hypervisor. Container משתף את ה-kernel של המארח ומבודד תהליכים, ולכן קל ומהיר יותר." },
    { q: "איך עושים deploy בלי downtime?", a: "Rolling או blue-green deployment מאחורי load balancer, health checks, מיגרציות תואמות לאחור ו-graceful shutdown." }
  ]
},
{
  id: "m8", title: "ביצועים ו-Caching", sub: "מדידה, Redis, בעיות DB ו-HTTP caching",
  intro: "המעבר מ'זה עובד' ל'זה עובד מהר'. הכלל הראשון: קודם מודדים, אחר כך משפרים.",
  lessons: [
    { id: "m8l1", title: "איך מודדים ביצועים", min: 40,
      goals: ["להבין latency, percentiles ו-throughput", "להריץ load test"],
      body: `<ul><li><b>Latency</b>: כמה זמן לוקחת בקשה. ממוצע מטעה, ולכן מסתכלים על <b>p50, p95 ו-p99</b>. p99 = 1% מהבקשות האיטיות ביותר.</li><li><b>Throughput</b>: בקשות לשנייה (RPS).</li><li><b>Error rate</b>.</li><li><b>Saturation</b>: כמה "מלא" המשאב: CPU, connections, זיכרון.</li></ul>
<p>כלים: <code>autocannon</code> או <b>k6</b> ל-load testing, ו-<code>clinic.js</code> או <code>--inspect</code> ל-profiling.</p>`,
      code: `# load test פשוט
npx autocannon -c 50 -d 20 -H "Authorization=Bearer $TOKEN" \\
  http://localhost:3000/v1/projects/1/tasks

// k6 script
import http from "k6/http";
export const options = { vus: 100, duration: "1m",
  thresholds: { http_req_duration: ["p(95)<200"] } };
export default () => http.get("http://localhost:3000/v1/projects/1/tasks",
  { headers: { Authorization: \`Bearer \${__ENV.TOKEN}\` } });`, lang: "bash",
      points: ["p99 הוא מה שהמשתמשים הכי מתוסכלים חווים.", "Load test רק על סביבה נפרדת, לא על פרודקשן.", "שומרים baseline כדי להשוות אחרי כל שינוי."],
      task: `<p>הריצי load test על endpoint של רשימת משימות עם מיליון שורות ב-DB. רשמי p50, p95, p99 ו-RPS ב-<code>notes/perf.md</code>. זה ה-baseline שלך.</p>` },
    { id: "m8l2", title: "Redis ו-Cache-Aside", min: 50,
      goals: ["לממש cache עם Redis", "להתמודד עם invalidation ו-TTL"],
      body: `<p><b>Cache-aside</b>, הדפוס הנפוץ: בודקים ב-cache. אם יש פגיעה (hit), מחזירים. אם לא (miss), קוראים מה-DB, שומרים ב-cache עם TTL ומחזירים. בעדכון מוחקים את המפתח.</p>
<p>"There are only two hard things in CS: cache invalidation and naming things." שאלות שצריך לשאול: כמה זמן מותר לנתון להיות ישן? מה קורה כשהמון בקשות מחכות לאותו miss (<b>cache stampede</b>)?</p>`,
      code: `import { createClient } from "redis";
const redis = await createClient({ url: config.REDIS_URL }).connect();

async function cached<T>(key: string, ttlSec: number, load: () => Promise<T>): Promise<T> {
  const hit = await redis.get(key);
  if (hit) return JSON.parse(hit) as T;
  const value = await load();
  await redis.set(key, JSON.stringify(value), { EX: ttlSec });
  return value;
}

// שימוש
export const getProjectSummary = (id: number) =>
  cached(\`project:\${id}:summary\`, 60, () => projectsRepo.summary(id));

// invalidation בעדכון
export async function updateTask(id: number, data: UpdateTaskInput) {
  const task = await tasksRepo.update(id, data);
  await redis.del(\`project:\${task.projectId}:summary\`);
  return task;
}`, lang: "typescript",
      points: ["TTL תמיד, כרשת ביטחון גם כשה-invalidation נכשל.", "לא לשמור ב-cache נתונים רגישים בלי מחשבה על הרשאות.", "מודדים hit rate. cache עם 10% hits לא שווה את המורכבות."],
      task: `<p>הוסיפי cache ל-endpoint של סיכום פרויקט (ספירת משימות לפי status). הריצי שוב את ה-load test והשווי ל-baseline.</p>` },
    { id: "m8l3", title: "N+1, Pagination ו-Connection Pool", min: 45,
      goals: ["לזהות ולתקן N+1", "לממש cursor pagination", "להבין connection pooling"],
      body: `<p>שלוש הבעיות הכי נפוצות בביצועי Backend:</p>
<ul><li><b>N+1</b>: מביאים 20 משימות, ואז שאילתה נפרדת לכל assignee. 21 שאילתות במקום 2.</li><li><b>Offset עמוק</b>: <code>OFFSET 100000</code> גורם ל-DB לעבור על 100,000 שורות ולזרוק אותן. <b>Cursor</b>: <code>WHERE id &lt; :lastId</code>, ישירות דרך האינדקס.</li><li><b>Connections</b>: פתיחת חיבור ל-DB יקרה, ול-Postgres יש מגבלה (כ-100). <b>Pool</b> שומר חיבורים פתוחים לשימוש חוזר. עם הרבה instances משתמשים ב-PgBouncer.</li></ul>`,
      code: `// ❌ N+1
const tasks = await prisma.task.findMany({ where: { projectId } });
for (const t of tasks) t.assignee = await prisma.user.findUnique({ where: { id: t.assigneeId! } });

// ✅ שאילתה אחת עם JOIN
const tasks2 = await prisma.task.findMany({ where: { projectId }, include: { assignee: true } });

// ✅ cursor pagination
async function listTasks(projectId: number, limit = 20, cursor?: number) {
  const items = await prisma.task.findMany({
    where: { projectId, ...(cursor && { id: { lt: cursor } }) },
    orderBy: { id: "desc" },
    take: limit + 1,                     // אחד נוסף כדי לדעת אם יש עוד
  });
  const hasMore = items.length > limit;
  return { items: items.slice(0, limit), nextCursor: hasMore ? items[limit - 1].id : null };
}`, lang: "typescript",
      points: ["הדליקי query logging בפיתוח, ו-N+1 יקפוץ לעין.", "Cursor יציב גם כשנוספות שורות בזמן הדפדוף.", "pool size × מספר instances ≤ מגבלת החיבורים של ה-DB."],
      task: `<p>המירי את רשימת המשימות ל-cursor pagination, ומצאי וסלקי N+1 אחד לפחות (הדליקי <code>log: ["query"]</code>).</p>` },
    { id: "m8l4", title: "HTTP Caching ו-CDN", min: 30,
      goals: ["להשתמש ב-Cache-Control וב-ETag", "להבין מה CDN עושה"],
      body: `<p>ה-cache הכי מהיר הוא בקשה שלא מגיעה לשרת בכלל.</p>
<ul><li><code>Cache-Control: public, max-age=300</code>: דפדפנים ו-CDN שומרים 5 דקות.</li><li><code>private</code>: רק הדפדפן, לנתונים אישיים. <code>no-store</code>: לא לשמור בכלל.</li><li><b>ETag</b>: "גרסה" של התשובה. הלקוח שולח <code>If-None-Match</code>, ואם לא השתנה מחזירים <b>304</b> בלי body.</li><li><b>CDN</b> (CloudFront, Cloudflare): שרתים קרובים למשתמש ששומרים תוכן סטטי ותשובות ציבוריות.</li></ul>`,
      code: `// תוכן ציבורי: רשימת תבניות פרויקט
router.get("/v1/templates", async (req, res) => {
  res.set("Cache-Control", "public, max-age=300, stale-while-revalidate=60");
  res.json(await templatesRepo.list());
});

// Express מייצר ETag אוטומטית ל-res.json, ומחזיר 304 כשמתאים
// בדיקה:
// curl -i http://localhost:3000/v1/templates
// curl -i -H 'If-None-Match: W/"a1b2..."' http://localhost:3000/v1/templates  → 304`, lang: "typescript",
      points: ["נתונים אישיים לעולם לא public.", "קבצים סטטיים עם hash בשם הקובץ = max-age של שנה.", "CDN מוריד עומס ו-latency גלובלית."],
      task: `<p>הוסיפי endpoint ציבורי עם Cache-Control, ובדקי עם curl שאת מקבלת 304 עם ETag.</p>` }
  ],
  project: { title: "שלב 8: מהיר", desc: "TaskFlow נמדד ומשופר.", steps: ["Baseline של load test מתועד", "Redis cache ל-summary, עם invalidation", "Cursor pagination בכל הרשימות", "אפס N+1 בנתיבים העיקריים", "השוואת לפני ואחרי ב-notes/perf.md"] },
  quiz: [
    { q: "ממוצע הזמן הוא 50ms, אבל p99 הוא 3 שניות. מה המשמעות?", opts: ["הכול תקין", "1% מהבקשות איטיות מאוד, ויש בעיה שהממוצע מסתיר", "שגיאה במדידה", "צריך יותר זיכרון"], a: 1, why: "בגלל זה מסתכלים על percentiles ולא על ממוצע." },
    { q: "למה OFFSET גדול איטי?", opts: ["הוא לא איטי", "ה-DB צריך לעבור על כל השורות שמדלגים עליהן", "בגלל JSON", "בגלל אינדקסים"], a: 1, why: "Cursor ניגש ישירות למקום באינדקס." },
    { q: "ב-cache-aside, מה עושים כשמעדכנים את הנתון?", opts: ["כלום", "מוחקים את המפתח מה-cache (או מעדכנים אותו)", "מאתחלים את Redis", "מעלים TTL"], a: 1, why: "כך הקריאה הבאה תביא נתון טרי." },
    { q: "Response עם נתוני משתמש אישיים. איזה Cache-Control?", opts: ["public, max-age=3600", "private או no-store", "immutable", "לא משנה"], a: 1, why: "public עלול לגרום ל-CDN להגיש נתונים של משתמש אחד לאחר." }
  ],
  interview: [
    { q: "מה זה cache stampede ואיך מונעים?", a: "מפתח פופולרי פג תוקף, ואלפי בקשות פונות ל-DB בבת אחת. פתרונות: lock או single-flight (בקשה אחת טוענת והשאר מחכות), TTL עם jitter, ו-refresh מוקדם." },
    { q: "איפה אפשר לשים cache במערכת?", a: "דפדפן, CDN, reverse proxy, זיכרון האפליקציה, cache מבוזר (Redis) ו-DB (buffer cache). כל שכבה עם trade-off של טריות מול מהירות." }
  ]
},
{
  id: "m9", title: "עיבוד אסינכרוני ו-Queues", sub: "Background jobs, retries, events ו-real-time",
  intro: "לא כל עבודה צריכה לקרות בזמן שהמשתמש מחכה. תורים מאפשרים להחזיר תשובה מהר, לספוג עומסים ולשרוד תקלות. זה צעד מרכזי בדרך ל-scale.",
  lessons: [
    { id: "m9l1", title: "למה צריך תורים", min: 45,
      goals: ["להבין producer, queue ו-worker", "לממש job עם BullMQ"],
      body: `<p>שליחת מייל, יצירת PDF ו-webhook ללקוח הם דברים איטיים ושבירים. אם עושים אותם בתוך הבקשה, המשתמש מחכה, ואם השירות החיצוני נופל, הבקשה נכשלת.</p>
<p>עם תור: ה-API <b>מכניס job</b> לתור ומחזיר מיד. <b>Worker</b>, תהליך נפרד, לוקח jobs ומבצע אותם. אפשר להוסיף workers כשיש עומס.</p>
<p><b>BullMQ</b> הוא תור מעל Redis, נפוץ ב-Node. בענן משתמשים ב-SQS, RabbitMQ או Kafka (במודול הבא).</p>`,
      code: `// queues.ts
import { Queue, Worker } from "bullmq";
const connection = { url: config.REDIS_URL };
export const emailQueue = new Queue("email", { connection });

// ב-service: מכניסים לתור ומחזירים מיד
await emailQueue.add("task-assigned", { taskId, assigneeId },
  { attempts: 5, backoff: { type: "exponential", delay: 2000 } });

// worker.ts: תהליך נפרד (npm run worker)
new Worker("email", async (job) => {
  const { taskId, assigneeId } = job.data;
  const [task, user] = await Promise.all([tasksRepo.get(taskId), usersRepo.get(assigneeId)]);
  await mailer.send(user.email, "New task assigned", task.title);
}, { connection, concurrency: 10 });`, lang: "typescript",
      points: ["ה-API וה-worker הם תהליכים נפרדים שמתרחבים בנפרד.", "ב-job שולחים ids, לא אובייקטים שלמים, כי הנתונים עלולים להשתנות.", "תור = buffer שסופג קפיצות עומס."],
      task: `<p>העבירי את שליחת המייל בהקצאת משימה ל-BullMQ, והוסיפי ל-compose שירות <code>worker</code>. כבי את ה-worker, הקצי 5 משימות, הדליקי אותו שוב וראי שהכול נשלח.</p>` },
    { id: "m9l2", title: "Retries, Idempotency ו-DLQ", min: 45,
      goals: ["לתכנן jobs שבטוח להריץ שוב", "לטפל בכישלונות קבועים"],
      body: `<p>מערכות מבוזרות מבטיחות בדרך כלל <b>at-least-once</b>: job יכול לרוץ פעמיים (ה-worker קרס אחרי השליחה ולפני האישור). לכן כל job חייב להיות <b>idempotent</b>.</p>
<ul><li>מפתח idempotency: שומרים "כבר טופל" ובודקים לפני ביצוע.</li><li><b>Exponential backoff + jitter</b>: ממתינים 2, 4, 8 שניות וכן הלאה, עם אקראיות כדי שלא כולם ינסו יחד.</li><li><b>Dead Letter Queue</b>: אחרי N כישלונות ה-job עובר לתור נפרד לבדיקה ידנית ולא נעלם.</li></ul>
<p>אותו עיקרון ב-API: header של <code>Idempotency-Key</code> מאפשר ללקוח לשלוח POST שוב בלי ליצור כפילות. Stripe עובדים כך.</p>`,
      code: `// worker idempotent
new Worker("email", async (job) => {
  const key = \`sent:\${job.name}:\${job.data.taskId}:\${job.data.assigneeId}\`;
  const first = await redis.set(key, "1", { NX: true, EX: 7 * 86400 });
  if (!first) return;               // כבר נשלח
  try {
    await mailer.send(/* ... */);
  } catch (e) {
    await redis.del(key);           // לאפשר retry
    throw e;
  }
}, { connection });

// Idempotency-Key ב-API
router.post("/v1/payments", async (req, res) => {
  const key = req.header("Idempotency-Key");
  const existing = key && await idemRepo.get(key);
  if (existing) return res.status(existing.status).json(existing.body);
  // ... ביצוע ושמירת התשובה תחת key
});`, lang: "typescript",
      points: ["Exactly-once כמעט לא קיים. מתכננים ל-at-least-once עם idempotency.", "Retry רק לשגיאות זמניות (timeout, 503), לא ל-400.", "מנטרים את גודל ה-DLQ."],
      task: `<p>הוסיפי ל-Mailer מצב "נכשל ב-50% מהמקרים". ודאי שבסוף כל מייל נשלח בדיוק פעם אחת, ושאחרי 5 כישלונות ה-job מגיע ל-failed.</p>` },
    { id: "m9l3", title: "אירועים, Webhooks ו-Outbox", min: 45,
      goals: ["להבין event-driven architecture", "לפתור את בעיית ה-dual write עם Outbox"],
      body: `<p>במקום ש-service אחד יקרא ישירות לחמישה אחרים, הוא מפרסם <b>אירוע</b> (<code>task.completed</code>), ומי שמעוניין מאזין. זה <b>Pub/Sub</b>: צימוד חלש, וקל להוסיף צרכנים.</p>
<p><b>בעיית ה-dual write</b>: שומרים ב-DB ואז שולחים לתור. מה קורה אם התהליך קרס באמצע? <b>Outbox pattern</b>: באותה טרנזקציה שומרים גם את השינוי וגם את האירוע בטבלת <code>outbox</code>, ותהליך נפרד מפרסם מהטבלה.</p>
<p><b>Webhooks</b> = אירועים שנשלחים ב-HTTP למערכות של לקוחות. חותמים אותם ב-HMAC ומבצעים retries.</p>`,
      code: `// Outbox: אטומי
await prisma.$transaction([
  prisma.task.update({ where: { id }, data: { status: "done" } }),
  prisma.outbox.create({ data: { type: "task.completed", payload: { taskId: id } } }),
]);

// relay: כל שנייה מפרסם אירועים שלא נשלחו
setInterval(async () => {
  const events = await prisma.outbox.findMany({ where: { sentAt: null }, take: 100 });
  for (const e of events) {
    await eventsQueue.add(e.type, e.payload, { jobId: String(e.id) }); // jobId = dedupe
    await prisma.outbox.update({ where: { id: e.id }, data: { sentAt: new Date() } });
  }
}, 1000);

// חתימת webhook
const sig = crypto.createHmac("sha256", hook.secret).update(body).digest("hex");
await fetch(hook.url, { method: "POST", body, headers: { "X-TaskFlow-Signature": sig } });`, lang: "typescript",
      points: ["אירוע מתאר עובדה בזמן עבר: task.completed.", "Outbox מבטיח שאירוע לא ילך לאיבוד ולא ייצא בלי שהשינוי נשמר.", "הצרכנים צריכים להיות idempotent."],
      task: `<p>הוסיפי טבלת outbox ו-relay. צרי אירוע <code>task.completed</code> ושני צרכנים: אחד מעדכן סטטיסטיקה, ואחד שולח webhook ל-<code>webhook.site</code>.</p>` },
    { id: "m9l4", title: "Real-time: WebSockets ו-SSE", min: 35,
      goals: ["לדחוף עדכונים ללקוח", "להבין את האתגר כשיש כמה שרתים"],
      body: `<p>HTTP רגיל: הלקוח שואל. כדי שהשרת ידחוף עדכונים ("משימה עודכנה"):</p>
<ul><li><b>SSE</b> (Server-Sent Events): זרם חד-כיווני מהשרת על HTTP. פשוט, ועובד מצוין לעדכונים.</li><li><b>WebSockets</b>: ערוץ דו-כיווני. מתאים לצ'אט ולמשחקים.</li></ul>
<p>האתגר ב-scale: משתמשת A מחוברת לשרת 1 ומשתמשת B לשרת 2. הפתרון: <b>Redis Pub/Sub</b> בין השרתים, וכל שרת מעביר הודעות ללקוחות שמחוברים אליו.</p>`,
      code: `// SSE endpoint
router.get("/v1/projects/:id/events", requireAuth, async (req, res) => {
  await assertCan(req.user.id, Number(req.params.id), "task:read");
  res.set({ "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" });
  res.flushHeaders();

  const channel = \`project:\${req.params.id}\`;
  const sub = redis.duplicate();
  await sub.connect();
  await sub.subscribe(channel, (msg) => res.write(\`data: \${msg}\\n\\n\`));

  req.on("close", () => sub.quit());
});

// כשמשימה משתנה, בכל שרת:
await redis.publish(\`project:\${task.projectId}\`, JSON.stringify({ type: "task.updated", task }));`, lang: "typescript",
      points: ["חיבורים פתוחים = state על השרת. צריך לתכנן אותם ל-scale.", "SSE מתחבר מחדש אוטומטית בדפדפן.", "Load balancer צריך לתמוך בחיבורים ארוכים."],
      task: `<p>ממשי SSE לעדכוני פרויקט. פתחי שני חלונות דפדפן עם <code>new EventSource(...)</code> וראי עדכונים בזמן אמת כשאת מעדכנת משימה עם curl.</p>` }
  ],
  project: { title: "שלב 9: אסינכרוני", desc: "TaskFlow עם תורים ואירועים.", steps: ["BullMQ ו-worker נפרד ב-compose", "מייל בהקצאה: retries, backoff ו-idempotency", "Cron job יומי: תזכורות למשימות שמגיעות למועד מחר", "Outbox ואירוע task.completed", "SSE לעדכוני פרויקט בזמן אמת"] },
  quiz: [
    { q: "worker שלח מייל וקרס לפני שאישר את ה-job. מה יקרה?", opts: ["ה-job יימחק", "ה-job ירוץ שוב, ולכן הוא צריך להיות idempotent", "המייל יבוטל", "Redis יקרוס"], a: 1, why: "At-least-once delivery. בלי idempotency יישלח מייל כפול." },
    { q: "מה פותר Outbox pattern?", opts: ["ביצועי DB", "עקביות בין שמירה ב-DB לפרסום אירוע", "אבטחה", "Caching"], a: 1, why: "שני הדברים נכתבים באותה טרנזקציה." },
    { q: "למה מוסיפים jitter ל-backoff?", opts: ["כדי שה-retries לא יגיעו כולם בבת אחת", "לקצר זמנים", "לאבטחה", "אין סיבה"], a: 0, why: "בלי jitter, אלפי לקוחות ינסו שוב באותה שנייה (thundering herd)." },
    { q: "מה מתאים יותר לדחיפת עדכוני סטטוס חד-כיווניים לדפדפן?", opts: ["Polling כל 100ms", "SSE", "FTP", "Cron"], a: 1, why: "SSE פשוט, עובד על HTTP ומתחבר מחדש לבד." }
  ],
  interview: [
    { q: "מתי היית מוסיפה תור למערכת?", a: "עבודה איטית או שבירה שלא חייבת לקרות בזמן הבקשה, ספיגת עומסים, ניתוק בין שירותים, ו-retries לשירותים חיצוניים." },
    { q: "איך מבטיחים שתשלום לא יבוצע פעמיים?", a: "Idempotency key מהלקוח, נשמר עם התוצאה ועם UNIQUE constraint. בקשה חוזרת מחזירה את התוצאה השמורה." },
    { q: "At-least-once מול at-most-once מול exactly-once?", a: "At-most: עלול לאבד. At-least: עלול לשכפל. Exactly-once אמיתי נדיר ויקר. בפועל משתמשים ב-at-least-once עם צרכנים idempotent." }
  ]
},
{
  id: "m10", title: "Scale", sub: "שרתים רבים, DB מבוזר, CAP, microservices ו-brokers",
  intro: "המודול שלשמו התכנסנו. מה קורה כש-TaskFlow עובר ממאה משתמשים למיליון? כאן נלמד את אבני הבניין של מערכות גדולות, ואת ה-trade-offs שמאחוריהן.",
  lessons: [
    { id: "m10l1", title: "Horizontal Scaling ו-Load Balancers", min: 50,
      goals: ["להבין vertical מול horizontal", "לבנות שרתים stateless מאחורי LB"],
      body: `<ul><li><b>Vertical</b>: מכונה חזקה יותר. פשוט, אבל יש תקרה ונקודת כשל אחת.</li><li><b>Horizontal</b>: יותר מכונות. אין תקרה, אבל השרתים חייבים להיות <b>stateless</b>.</li></ul>
<p><b>Stateless</b> = אין בזיכרון של השרת שום דבר שבקשה הבאה צריכה: לא sessions, לא קבצים מקומיים ולא cache מקומי קריטי. הכול עובר ל-DB, ל-Redis או ל-S3. כך כל בקשה יכולה להגיע לכל שרת.</p>
<p><b>Load Balancer</b> מחלק בקשות (round robin, least connections), בודק health ומוציא שרתים חולים. בנוסף יש <b>Auto-scaling</b>: הוספת שרתים לפי CPU או לפי RPS.</p>`,
      code: `# nginx.conf: LB מעל 3 instances
upstream taskflow {
  least_conn;
  server api1:3000;
  server api2:3000;
  server api3:3000;
}
server {
  listen 80;
  location / {
    proxy_pass http://taskflow;
    proxy_set_header X-Request-Id $request_id;
  }
}

# compose
#   docker compose up --scale api=3`, lang: "nginx",
      points: ["כל state שנשאר בזיכרון מונע scale.", "Health check אמיתי בודק גם את החיבור ל-DB.", "ב-Node: גם מכונה אחת יכולה להריץ כמה תהליכים (cluster/PM2)."],
      task: `<p>הריצי 3 instances של TaskFlow מאחורי nginx ב-compose. הוסיפי ל-<code>/health</code> את ה-hostname וראי את החלוקה. כבי instance אחד באמצע load test. מה קורה?</p>` },
    { id: "m10l2", title: "Scaling של ה-DB", min: 55,
      goals: ["להכיר read replicas, partitioning ו-sharding", "לדעת מתי כל אחד נדרש"],
      body: `<p>ה-DB הוא בדרך כלל צוואר הבקבוק הראשון. הסדר שבו מטפלים בו, מהזול ליקר:</p>
<ol><li><b>אופטימיזציה</b>: אינדקסים, שאילתות, cache (מודול 8).</li><li><b>Vertical</b>: מכונה גדולה יותר. זה לוקח רחוק מאוד.</li><li><b>Read replicas</b>: עותקים לקריאה. כתיבות הולכות ל-primary. חיסרון: <b>replication lag</b>, כך שמשתמשת שעדכנה עלולה לא לראות את העדכון שלה.</li><li><b>Partitioning</b>: חלוקת טבלה ענקית לחלקים באותו DB (לפי תאריך, למשל).</li><li><b>Sharding</b>: חלוקת הנתונים בין כמה DBs לפי מפתח (למשל workspace_id). כוח אדיר, ומורכבות אדירה: JOINs בין shards, rebalancing ו-hot shards.</li></ol>`,
      code: `// ניתוב קריאה/כתיבה
const primary = new PrismaClient({ datasourceUrl: config.DATABASE_URL });
const replica = new PrismaClient({ datasourceUrl: config.DATABASE_REPLICA_URL });

// read-your-writes: אחרי כתיבה, קוראים מה-primary לזמן קצר
const db = (req: Request) => (req.session?.wroteRecently ? primary : replica);

// sharding לפי workspace: consistent hashing
function shardFor(workspaceId: string, shards: string[]) {
  const h = crypto.createHash("md5").update(workspaceId).digest().readUInt32BE(0);
  return shards[h % shards.length];   // בפועל: consistent hashing ring
}`, lang: "typescript",
      points: ["Sharding הוא המוצא האחרון, לא הראשון.", "בחירת shard key: לפי מה רוב השאילתות מסננות, ועם פיזור אחיד.", "Consistent hashing מצמצם העברת נתונים כשמוסיפים shard."],
      task: `<p>כתבי ב-<code>docs/scaling-db.md</code> תוכנית ל-TaskFlow ב-10 מיליון משתמשים: מה ה-shard key ולמה? מה קורה לשאילתה "כל המשימות שלי בכל ה-workspaces"?</p>` },
    { id: "m10l3", title: "CAP ומערכות מבוזרות", min: 45,
      goals: ["להבין את משפט CAP ומודלי עקביות", "לנמק trade-offs בראיון"],
      body: `<p><b>CAP</b>: כשיש <b>Partition</b> ברשת (וזה תמיד יקרה), מערכת מבוזרת צריכה לבחור בין <b>Consistency</b> (כולם רואים את אותו נתון, או שגיאה) לבין <b>Availability</b> (תמיד עונים, גם אם עם נתון ישן).</p>
<ul><li>בנק או מלאי: עדיפה עקביות (CP).</li><li>מספר לייקים או פיד: עדיפה זמינות (AP), עם <b>eventual consistency</b>.</li></ul>
<p>מושגים נוספים: <b>PACELC</b> (גם בלי partition יש trade-off בין latency לעקביות), <b>quorum</b> (כתיבה ל-W מתוך N עותקים), ושעונים לא אמינים במערכות מבוזרות.</p>`,
      code: `Network partition between DC-A and DC-B
           ┌──────────┐    ✂    ┌──────────┐
  user ──► │  Node A  │ ─ ─ ─ ─ │  Node B  │ ◄── user
           └──────────┘         └──────────┘
CP choice: B refuses writes until healed   → correct, less available
AP choice: both accept writes, merge later → available, temporarily inconsistent

Quorum (N=3): W=2, R=2  → W + R > N ⇒ reads see latest write`, lang: "plaintext",
      points: ["CAP הוא בחירה בזמן תקלה, לא בחירה קבועה.", "רוב המערכות מערבבות: חלקים CP וחלקים AP.", "בראיון: להגיד איזה נתון צריך איזו עקביות, ולמה."],
      task: `<p>לכל פיצ'ר ב-TaskFlow (יצירת משימה, ספירת משימות בדשבורד, הרשאות חברות, התראות) קבעי אם עדיפה עקביות חזקה או eventual consistency, ונמקי.</p>` },
    { id: "m10l4", title: "Monolith מול Microservices", min: 45,
      goals: ["להבין את ה-trade-offs", "להכיר API Gateway ותקשורת בין שירותים"],
      body: `<p><b>Monolith</b>: יחידת deploy אחת. פשוט לפתח, לבדוק ולעשות deploy. <b>Microservices</b>: שירותים קטנים ועצמאיים, כל אחד עם DB משלו. צוותים עצמאיים ו-scale נפרד, אבל מורכבות תפעולית עצומה: רשת, עקביות, debugging ו-deploy.</p>
<p>ההמלצה המקובלת: <b>Modular monolith</b> תחילה, עם גבולות ברורים בין מודולים (כמו שבנינו), ופיצול רק כשיש סיבה ממשית: צוותים רבים, צורכי scale שונים או טכנולוגיה שונה.</p>
<ul><li><b>API Gateway</b>: נקודת כניסה אחת עם auth, rate limit ו-routing לשירותים.</li><li>תקשורת סינכרונית (REST/gRPC) מול אסינכרונית (אירועים).</li><li><b>Saga</b>: טרנזקציה על פני כמה שירותים, עם פעולות מפצות.</li></ul>`,
      code: `                ┌─────────────┐
   clients ───► │ API Gateway │  auth · rate limit · routing
                └──────┬──────┘
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
  ┌──────────┐  ┌────────────┐  ┌──────────────┐
  │  Tasks   │  │   Users    │  │ Notifications│
  │ service  │  │  service   │  │   service    │
  └────┬─────┘  └─────┬──────┘  └──────▲───────┘
       │ DB           │ DB             │
       └──── events (Kafka) ───────────┘  task.assigned → notify`, lang: "plaintext",
      points: ["Microservices פותרים בעיה ארגונית יותר מבעיה טכנית.", "DB משותף לכמה שירותים = distributed monolith.", "בראיון: להתחיל פשוט ולפצל עם נימוק."],
      task: `<p>אם היית מפצלת את TaskFlow, מה השירות הראשון שהיית מוציאה ולמה? (רמז: notifications). תארי איך הוא מקבל מידע בלי לגשת ל-DB של tasks.</p>` },
    { id: "m10l5", title: "Message Brokers: Kafka ו-RabbitMQ", min: 50,
      goals: ["להבין topics, partitions ו-consumer groups", "לדעת מתי Kafka ומתי תור רגיל"],
      body: `<ul><li><b>RabbitMQ / SQS</b>: תור הודעות. הודעה נצרכת ונמחקת. מצוין ל-jobs ולמשימות.</li><li><b>Kafka</b>: <b>log</b> מתמשך. הודעות נשמרות לפי זמן, וכמה צרכנים קוראים כל אחד בקצב שלו, ואפשר "לחזור אחורה". מצוין ל-event streaming, analytics ושכפול נתונים.</li></ul>
<p>מושגי Kafka: <b>topic</b> מחולק ל-<b>partitions</b>. סדר מובטח רק בתוך partition, ולכן key של הודעה (למשל projectId) קובע לאיזה partition היא הולכת. <b>Consumer group</b>: כל partition נקרא על ידי צרכן אחד בקבוצה, וכך מתרחבים.</p>`,
      code: `import { Kafka } from "kafkajs";
const kafka = new Kafka({ clientId: "taskflow", brokers: ["kafka:9092"] });

// producer: key = projectId → סדר נשמר לכל פרויקט
const producer = kafka.producer();
await producer.send({
  topic: "task-events",
  messages: [{ key: String(task.projectId), value: JSON.stringify({ type: "task.completed", taskId: task.id }) }],
});

// consumer group: מתרחב עד מספר ה-partitions
const consumer = kafka.consumer({ groupId: "analytics" });
await consumer.subscribe({ topic: "task-events" });
await consumer.run({
  eachMessage: async ({ message }) => { await analytics.record(JSON.parse(message.value!.toString())); },
});`, lang: "typescript",
      points: ["מספר הצרכנים האפקטיבי ≤ מספר ה-partitions.", "Kafka שומר היסטוריה, ולכן אפשר להוסיף צרכן חדש ולעבד הכול מההתחלה.", "Consumer lag הוא המדד החשוב לניטור."],
      task: `<p>הריצי Kafka ב-compose (Redpanda קל יותר להרצה). העבירי את אירועי ה-outbox ל-topic, והריצי שני consumer groups שונים על אותו topic.</p>` },
    { id: "m10l6", title: "Rate Limiting ו-Backpressure", min: 45,
      goals: ["לממש rate limiter מבוזר", "להגן על המערכת מעומס יתר"],
      body: `<p>כשיש כמה שרתים, rate limit בזיכרון לא עובד, כי כל שרת סופר לבד. צריך מונה משותף ב-Redis.</p>
<ul><li><b>Fixed window</b>: פשוט, אבל מאפשר פרץ כפול בגבול בין החלונות.</li><li><b>Sliding window</b>: מדויק יותר.</li><li><b>Token bucket</b>: דלי שמתמלא בקצב קבוע, ומאפשר פרצים קצרים. הנפוץ ביותר.</li></ul>
<p><b>Backpressure / Load shedding</b>: כשהמערכת עמוסה, עדיף לדחות חלק מהבקשות מהר (503/429) מאשר שכולן יאטו עד קריסה.</p>`,
      code: `// Token bucket אטומי ב-Redis עם Lua
const script = \`
local tokens = tonumber(redis.call('HGET', KEYS[1], 't') or ARGV[1])
local ts     = tonumber(redis.call('HGET', KEYS[1], 'ts') or ARGV[3])
local refill = (tonumber(ARGV[3]) - ts) * tonumber(ARGV[2])
tokens = math.min(tonumber(ARGV[1]), tokens + refill)
if tokens < 1 then return 0 end
redis.call('HSET', KEYS[1], 't', tokens - 1, 'ts', ARGV[3])
redis.call('EXPIRE', KEYS[1], 60)
return 1\`;

export const rateLimit = (capacity: number, perSec: number) => async (req, res, next) => {
  const ok = await redis.eval(script, {
    keys: [\`rl:\${req.user?.id ?? req.ip}\`],
    arguments: [String(capacity), String(perSec), String(Date.now() / 1000)],
  });
  if (!ok) return res.status(429).set("Retry-After", "1").json({ error: { code: "RATE_LIMITED" } });
  next();
};`, lang: "typescript",
      points: ["Lua ב-Redis = פעולה אטומית, בלי race conditions.", "429 עם Retry-After.", "Rate limit לפי משתמש, לפי IP ולפי endpoint יקר."],
      task: `<p>ממשי את ה-token bucket והפעילי אותו על 3 instances. הוכיחי עם load test שהמגבלה נאכפת גלובלית ולא לכל שרת בנפרד.</p>` }
  ],
  project: { title: "שלב 10: Scale", desc: "TaskFlow רץ על כמה שרתים ומתוכנן לגדול.", steps: ["3 instances מאחורי nginx, stateless לגמרי", "Rate limiter מבוזר ב-Redis", "אירועים ל-Kafka/Redpanda עם 2 consumer groups", "SSE שעובד בין instances (Redis pub/sub)", "docs/scaling-db.md: replicas, shard key ו-trade-offs", "Load test על 1 מול 3 instances, מתועד"] },
  quiz: [
    { q: "מה התנאי המרכזי ל-horizontal scaling של שרתי API?", opts: ["מכונה חזקה", "שרתים stateless", "Microservices", "Kafka"], a: 1, why: "אם state נשמר בזיכרון של שרת, בקשה שמגיעה לשרת אחר לא תמצא אותו." },
    { q: "משתמשת עדכנה פרופיל, רעננה, ורואה את הערך הישן. מה הסיבה הסבירה?", opts: ["באג ב-React", "Replication lag: הקריאה הגיעה מ-replica", "Rate limit", "CORS"], a: 1, why: "פתרון: read-your-writes, קריאה מה-primary אחרי כתיבה." },
    { q: "ב-Kafka, topic עם 4 partitions ו-consumer group עם 6 צרכנים. כמה צרכנים פעילים?", opts: ["6", "4", "1", "24"], a: 1, why: "כל partition מוקצה לצרכן אחד בקבוצה. שני צרכנים יהיו idle." },
    { q: "למה rate limit בזיכרון לא מספיק עם כמה שרתים?", opts: ["הוא איטי", "כל שרת סופר בנפרד, והמגבלה האמיתית מוכפלת", "הוא לא מאובטח", "הוא מספיק"], a: 1, why: "צריך מונה משותף, למשל Redis." },
    { q: "מתי לבחור microservices?", opts: ["תמיד מההתחלה", "כשיש צורך ארגוני או טכני ממשי: צוותים רבים, scale שונה", "כשיש מעט משתמשים", "כשאין CI"], a: 1, why: "מתחילים ב-modular monolith ומפצלים עם נימוק." }
  ],
  interview: [
    { q: "המערכת איטית תחת עומס. איך היית ניגשת?", a: "מודדים: איפה הזמן הולך (APM, p99, DB). מטפלים בצוואר הבקבוק: אינדקסים ו-N+1, cache, העברת עבודה לתורים, horizontal scaling לשכבה ה-stateless, ו-replicas ל-DB. כל שינוי נמדד." },
    { q: "הסבירי את CAP", a: "בזמן partition ברשת צריך לבחור בין עקביות לזמינות. דוגמאות: מלאי ותשלומים CP, פיד ולייקים AP עם eventual consistency." },
    { q: "Kafka מול RabbitMQ?", a: "Rabbit: תור, הודעה נצרכת פעם אחת, routing גמיש, טוב ל-jobs. Kafka: log מתמשך, replay, throughput גבוה, הרבה צרכנים עצמאיים, טוב ל-event streaming." },
    { q: "איך בוחרים shard key?", a: "לפי דפוס הגישה העיקרי (רוב השאילתות בתוך shard אחד), עם פיזור אחיד ובלי hot spots. tenant_id נפוץ ב-SaaS." }
  ]
},
{
  id: "m11", title: "Observability ואמינות", sub: "Logs, Metrics, Tracing ו-Resilience",
  intro: "במערכת גדולה משהו תמיד שבור. השאלה היא אם תדעי על זה לפני הלקוחות, ואם המערכת תשרוד. זה מה שמבדיל קוד שרץ בפרודקשן מקוד שרץ במחשב.",
  lessons: [
    { id: "m11l1", title: "Logging מובנה", min: 35,
      goals: ["לכתוב לוגים שאפשר לחפש בהם", "לקשר לוגים לבקשה אחת"],
      body: `<p><code>console.log("user created")</code> לא עוזר כשיש מיליון שורות ביום. <b>Structured logging</b>: כל לוג הוא JSON עם שדות קבועים (level, requestId, userId, duration), כך שאפשר לחפש ולסנן ב-Datadog, ב-Loki או ב-CloudWatch.</p>
<p>רמות: <code>error</code> (מישהו צריך לפעול), <code>warn</code>, <code>info</code> (אירועים עסקיים), <code>debug</code> (כבוי בפרודקשן). לוגים נכתבים ל-stdout, והתשתית אוספת אותם.</p>`,
      code: `import pino from "pino";
import pinoHttp from "pino-http";

export const logger = pino({
  level: config.LOG_LEVEL,
  redact: ["req.headers.authorization", "*.password"],
});

app.use(pinoHttp({
  logger,
  genReqId: (req) => (req.headers["x-request-id"] as string) ?? crypto.randomUUID(),
}));

// בכל מקום בקוד: req.log כולל את ה-requestId אוטומטית
req.log.info({ taskId: task.id, projectId }, "task created");
// {"level":30,"time":...,"reqId":"7f3a...","taskId":918,"projectId":42,"msg":"task created"}`, lang: "typescript",
      points: ["requestId שעובר בין שירותים מאפשר לעקוב אחרי בקשה מקצה לקצה.", "redact לסודות.", "לוג על כל שגיאה, עם הקשר מספיק כדי לשחזר."],
      task: `<p>החליפי את כל ה-console.log ב-pino, והעבירי את ה-requestId גם ל-jobs בתור, כדי שאפשר יהיה לעקוב מבקשה ועד המייל שנשלח.</p>` },
    { id: "m11l2", title: "Metrics ו-Tracing", min: 45,
      goals: ["לחשוף מטריקות ל-Prometheus", "להבין distributed tracing"],
      body: `<p>שלושת עמודי ה-Observability: <b>Logs</b> (מה קרה), <b>Metrics</b> (כמה ובאיזה קצב), <b>Traces</b> (איפה הזמן הלך, לאורך שירותים).</p>
<p><b>RED method</b> לכל שירות: <b>R</b>ate (בקשות לשנייה), <b>E</b>rrors (שיעור שגיאות), <b>D</b>uration (latency percentiles). Prometheus אוסף, ו-Grafana מציג ומתריע.</p>
<p><b>OpenTelemetry</b> הוא התקן הפתוח ל-tracing: כל בקשה מקבלת trace, וכל פעולה (שאילתת DB, קריאת HTTP) היא span.</p>`,
      code: `import client from "prom-client";
client.collectDefaultMetrics();   // CPU, memory, event loop lag

const httpDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP latency",
  labelNames: ["method", "route", "status"],
  buckets: [0.01, 0.05, 0.1, 0.3, 1, 3],
});

app.use((req, res, next) => {
  const end = httpDuration.startTimer();
  res.on("finish", () => end({ method: req.method, route: req.route?.path ?? "unknown", status: res.statusCode }));
  next();
});

app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", client.register.contentType).send(await client.register.metrics());
});

// PromQL: p95 latency
// histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le, route))`, lang: "typescript",
      points: ["label לפי route ולא לפי URL מלא (cardinality!).", "Event loop lag הוא מדד בריאות ייחודי ל-Node.", "התראות על סימפטומים שמשתמשים מרגישים, לא על כל CPU spike."],
      task: `<p>הוסיפי <code>/metrics</code>, ו-Prometheus ו-Grafana ל-compose. בני דשבורד RED, הריצי load test וצפי בגרפים.</p>` },
    { id: "m11l3", title: "Resilience", min: 50,
      goals: ["להשתמש ב-timeouts, retries ו-circuit breakers", "לממש graceful shutdown ו-health checks"],
      body: `<ul><li><b>Timeouts</b> לכל קריאה חיצונית. בלי timeout, שירות איטי אחד ממלא את כל המשאבים שלך.</li><li><b>Retries</b> עם backoff ו-jitter, רק לשגיאות זמניות ורק לפעולות idempotent.</li><li><b>Circuit breaker</b>: אחרי N כישלונות מפסיקים לנסות לזמן מה ומחזירים fallback. כך לא מעמיסים על שירות שכבר נופל.</li><li><b>Graceful shutdown</b>: ב-deploy מקבלים SIGTERM. מפסיקים לקבל בקשות חדשות, מסיימים את הקיימות וסוגרים חיבורים.</li><li><b>Health checks</b>: <code>/health/live</code> (התהליך חי) ו-<code>/health/ready</code> (מוכן לקבל תעבורה, DB מחובר).</li></ul>`,
      code: `// timeout לכל fetch
const res = await fetch(url, { signal: AbortSignal.timeout(2000) });

// graceful shutdown
const server = app.listen(config.PORT);
async function shutdown(signal: string) {
  logger.info({ signal }, "shutting down");
  isShuttingDown = true;                       // /health/ready יחזיר 503
  server.close(async () => {                   // מסיים בקשות פתוחות
    await Promise.allSettled([prisma.$disconnect(), redis.quit(), emailQueue.close()]);
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10_000).unref();   // רשת ביטחון
}
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

app.get("/health/ready", async (_req, res) => {
  if (isShuttingDown) return res.status(503).end();
  try { await prisma.$queryRaw\`SELECT 1\`; res.json({ ok: true }); }
  catch { res.status(503).json({ ok: false }); }
});`, lang: "typescript",
      points: ["כשל של תלות אחת לא צריך להפיל את הכול (bulkheads).", "Retries בלי מגבלה = DDoS עצמי.", "מגדירים SLO (למשל 99.9% זמינות) ו-error budget."],
      task: `<p>הוסיפי timeouts לכל הקריאות החיצוניות, graceful shutdown ו-readiness check. הריצי load test, עשי <code>docker compose restart api</code> באמצע, ובדקי שלא היו שגיאות 5xx.</p>` }
  ],
  project: { title: "שלב 11: Production-ready", desc: "TaskFlow שאפשר לתפעל.", steps: ["pino עם requestId מקצה לקצה (כולל jobs)", "/metrics, ו-Grafana עם דשבורד RED", "Timeouts ו-retries על קריאות חיצוניות", "Graceful shutdown ו-health live/ready", "Runbook קצר: 'ה-API מחזיר 500, מה עושים?'"] },
  quiz: [
    { q: "מה שלושת עמודי ה-Observability?", opts: ["CPU, RAM, Disk", "Logs, Metrics, Traces", "Dev, Staging, Prod", "Unit, Integration, E2E"], a: 1, why: "כל אחד עונה על שאלה אחרת: מה, כמה, ואיפה." },
    { q: "למה לא לשים את ה-URL המלא (עם ids) כ-label במטריקה?", opts: ["אבטחה", "high cardinality: מיליוני סדרות זמן מפילים את Prometheus", "זה איטי לכתיבה", "אין בעיה"], a: 1, why: "משתמשים בתבנית route: /tasks/:id." },
    { q: "מה עושה circuit breaker?", opts: ["מצפין", "מפסיק לקרוא לשירות כושל לזמן מה ומחזיר fallback", "מאזן עומסים", "מגבה DB"], a: 1, why: "מונע cascading failures ונותן לשירות הכושל להתאושש." },
    { q: "מה צריך לקרות כשה-process מקבל SIGTERM?", opts: ["exit מיידי", "להפסיק לקבל בקשות חדשות, לסיים את הקיימות ולסגור חיבורים", "להתעלם", "restart"], a: 1, why: "זה graceful shutdown, ובלעדיו כל deploy מייצר שגיאות." }
  ],
  interview: [
    { q: "קיבלת התראה ש-p99 קפץ. מה את עושה?", a: "דשבורד: האם זה כל ה-routes או אחד? האם היה deploy? DB, תלויות חיצוניות, event loop lag. Traces של בקשות איטיות, ולוגים לפי requestId. מיטיגציה (rollback, scale) ואז root cause ו-postmortem." },
    { q: "Liveness מול Readiness?", a: "Liveness: התהליך תקוע? אם כן, restart. Readiness: מוכן לתעבורה? אם לא, ה-LB לא שולח אליו, בלי restart." }
  ]
},
{
  id: "m12", title: "System Design ומוכנות לעבודה", sub: "מסגרת לראיון, תרגילים קלאסיים ותיק עבודות",
  intro: "המודול האחרון מחבר הכול. נלמד לחשוב ולדבר כמו מהנדסת Backend בראיון, ונהפוך את TaskFlow לפרויקט שמשכנע מגייסים.",
  lessons: [
    { id: "m12l1", title: "מסגרת לראיון System Design", min: 45,
      goals: ["לנהל ראיון design ב-45 דקות", "לבצע הערכות גודל (back-of-envelope)"],
      body: `<p>מראיינים לא מחפשים תשובה "נכונה". הם מחפשים חשיבה מובנית ו-trade-offs. המסגרת:</p>
<ol><li><b>דרישות (5 דק')</b>: פונקציונליות (מה המערכת עושה), ודרישות לא-פונקציונליות (כמה משתמשים, latency, זמינות, עקביות). שואלים!</li><li><b>הערכות (3 דק')</b>: QPS, אחסון, יחס קריאה/כתיבה.</li><li><b>API (5 דק')</b>: endpoints עיקריים.</li><li><b>מודל נתונים (5 דק')</b>: טבלאות ובחירת DB.</li><li><b>High-level design (10 דק')</b>: קופסאות וחצים.</li><li><b>Deep dive (15 דק')</b>: צוואר הבקבוק, scale, תקלות.</li><li><b>סיכום</b>: מה הייתי משפרת.</li></ol>`,
      code: `Back-of-envelope cheat sheet
──────────────────────────────
1 day ≈ 86,400 s ≈ 10^5 s
10M DAU × 10 req/day = 10^8 req/day ≈ 1,000 QPS avg  (peak ×3 ≈ 3,000)
1 Postgres primary  ≈ 5–10K simple QPS
1 Redis             ≈ 100K ops/s
1 Node instance     ≈ 1–5K req/s for light JSON endpoints

Latency numbers:
  RAM read ~100 ns | SSD read ~100 µs | same-DC round trip ~0.5 ms
  cross-continent round trip ~150 ms`, lang: "plaintext",
      points: ["לא לקפוץ לפתרון לפני דרישות.", "לחשוב בקול, ולהציע אפשרויות עם trade-offs.", "המספרים נועדו להחליט החלטות, לא לדייק."],
      task: `<p>עשי הערכה ל-TaskFlow עם 5 מיליון משתמשים פעילים ביום: QPS ממוצע ושיא, אחסון לשנה (משימות ותגובות), ויחס קריאה/כתיבה. מה הצוואר הראשון?</p>` },
    { id: "m12l2", title: "תרגיל: URL Shortener", min: 50,
      goals: ["לפתור שאלת design קלאסית מקצה לקצה"],
      body: `<p><b>דרישות</b>: קיצור URL, הפניה מהירה, 100M קישורים חדשים בחודש, יחס קריאה/כתיבה של 100:1, ו-latency נמוך בהפניה.</p>
<p><b>החלטות מרכזיות</b>:</p>
<ul><li><b>יצירת מפתח</b>: מונה גלובלי שמקודד ב-base62 (7 תווים = 3.5 טריליון). או hash עם טיפול בהתנגשויות. או טווחי ids מראש לכל שרת.</li><li><b>DB</b>: Key-value (DynamoDB/Cassandra) או Postgres עם sharding לפי key.</li><li><b>קריאות</b>: Redis cache לקישורים חמים, ו-CDN. 301 (cacheable) או 302 (מאפשר ספירת קליקים).</li><li><b>Analytics</b>: קליק נשלח לאירוע ב-Kafka ונספר בנפרד, לא חוסם את ההפניה.</li></ul>`,
      code: `POST /urls { longUrl } → { shortUrl: "https://tf.ly/aZ3kQ9x" }
GET  /aZ3kQ9x          → 302 Location: longUrl

          ┌──────┐   miss  ┌──────────┐
client ─► │ LB   │ ─► API ─┤ Redis    ├─► KV store (sharded by key)
          └──────┘         └──────────┘
                     │ click event
                     ▼
                  Kafka ─► analytics workers ─► OLAP DB

function base62(n: bigint): string {
  const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let s = "";
  do { s = chars[Number(n % 62n)] + s; n /= 62n; } while (n > 0n);
  return s;
}`, lang: "plaintext",
      points: ["יחס 100:1, ולכן ההשקעה הולכת לקריאות: cache, CDN ו-replicas.", "מונה גלובלי = נקודת כשל. פתרון: טווחים מראש.", "להפריד את ה-analytics מהנתיב הקריטי."],
      task: `<p>תרגלי בקול, עם טיימר של 35 דקות, ובלי להציץ. אחר כך שלחי למורה את התכנון שלך לקבלת משוב (כפתור "שאלי את המורה").</p>` },
    { id: "m12l3", title: "תרגיל: מערכת התראות / צ'אט", min: 50,
      goals: ["לתכנן מערכת real-time בקנה מידה"],
      body: `<p><b>Notification service ל-TaskFlow</b>: התראות in-app, מייל ו-push, עם העדפות משתמש, ובלי כפילויות.</p>
<ul><li>שירותים מפרסמים אירועים (<code>task.assigned</code>) ל-Kafka.</li><li>Notification service: מחיל העדפות, מבצע dedupe לפי מפתח, ושומר ב-DB (לתיבת ההתראות).</li><li>Fan-out לתורים לפי ערוץ (email, push, websocket), עם workers ו-retries לכל ערוץ.</li><li>Real-time: WebSocket gateway. שרתי ה-gateway מחזיקים חיבורים, ו-Redis pub/sub או ממפה של user לשרת מנתבים הודעות.</li><li>Rate limiting למשתמש (לא 50 מיילים בדקה), ו-digest.</li></ul>
<p>שאלות deep dive נפוצות: מה קורה כשמשתמש לא מחובר? איך מבטיחים סדר? מה קורה כשספק המייל נופל?</p>`,
      code: `services ──events──► Kafka [notifications]
                         │
                         ▼
               Notification Service
         (preferences · dedupe · persist)
            │           │            │
            ▼           ▼            ▼
       email queue  push queue   realtime (Redis pub/sub)
            │           │            │
       email workers push workers  WS gateways ◄──► clients
       (SES, retry)  (FCM/APNs)    (sticky connections)`, lang: "plaintext",
      points: ["כל ערוץ נכשל בנפרד ומתרחב בנפרד.", "Dedupe key = eventId + userId + channel.", "חיבורי WebSocket הם state, ולכן gateway נפרד מה-API."],
      task: `<p>תכנני "צ'אט לכל פרויקט" ב-TaskFlow: הודעות בזמן אמת, היסטוריה וסימון "נקרא". ציירי (אפילו בטקסט) ונמקי את בחירת ה-DB להודעות.</p>` },
    { id: "m12l4", title: "תיק עבודות וחיפוש עבודה", min: 40,
      goals: ["להפוך את TaskFlow לפרויקט שמשכנע", "להתכונן לסוגי הראיונות של Junior Backend"],
      body: `<p><b>README שמוכר</b>: מה המערכת עושה, דיאגרמת ארכיטקטורה, טכנולוגיות ולמה נבחרו, איך מריצים (<code>docker compose up</code>), קישור חי, החלטות ו-trade-offs, ותוצאות load test.</p>
<p><b>סוגי ראיונות ל-Junior Backend בישראל</b>:</p>
<ul><li><b>Coding</b>: אלגוריתמים ברמת easy-medium (מערכים, hash maps, strings, BFS). תרגול ב-LeetCode, כ-75 שאלות נבחרות.</li><li><b>Backend practical</b>: "בני API ל-X" בשעה או בבית. כאן TaskFlow מכין אותך בדיוק.</li><li><b>שאלות ידע</b>: HTTP, DB, אינדקסים, event loop, async ואבטחה. בנק השאלות בכל מודול באתר.</li><li><b>System design קל</b>: לפעמים גם לג'וניורים.</li><li><b>שיחה על הפרויקט</b>: "למה Postgres? מה היית עושה אחרת?"</li></ul>
<p>היתרון שלך: Python + Node/TS = גמישות. זה יתרון אמיתי בקו"ח.</p>`,
      code: `## TaskFlow API
Team task management backend · Node.js · TypeScript · PostgreSQL · Redis · Kafka

[Architecture diagram]

### Highlights
- JWT auth with role-based access control per project
- Cursor pagination + Redis cache → p95 from 180ms to 22ms (k6, 200 VUs)
- Async notifications via BullMQ with idempotent workers and outbox pattern
- Horizontally scaled behind nginx, distributed token-bucket rate limiter
- 120 tests (Vitest + Supertest) · CI on GitHub Actions · deployed on Render

### Run locally
docker compose up`, lang: "markdown",
      points: ["מספרים אמיתיים (לפני ואחרי) שווים יותר מרשימת טכנולוגיות.", "תתאמני לספר את סיפור הפרויקט ב-2 דקות.", "כל commit מסודר הוא חלק מהתיק."],
      task: `<p>כתבי README מלא ל-TaskFlow, והקליטי לעצמך הסבר של 2 דקות על הארכיטקטורה. בונוס: ראיון mock עם המורה (שאלי "תראייני אותי").</p>` }
  ],
  project: { title: "שלב 12: פרויקט גמר", desc: "TaskFlow מוכן להצגה בראיונות.", steps: ["docs/design.md: TaskFlow ל-10M משתמשים, כולל הערכות ו-trade-offs", "README מקצועי עם דיאגרמה, מספרים וקישור חי", "סיפור פרויקט של 2 דקות, מתורגל", "3 תרגילי system design בכתב, עם משוב", "50 שאלות LeetCode easy/medium", "ראיון mock מלא"] },
  quiz: [
    { q: "מה הצעד הראשון בראיון system design?", opts: ["לצייר את הארכיטקטורה", "להבהיר דרישות והיקפים", "לבחור DB", "לכתוב קוד"], a: 1, why: "בלי דרישות אין דרך לנמק החלטות." },
    { q: "10M משתמשים, 10 בקשות ליום כל אחד. מה ה-QPS הממוצע בקירוב?", opts: ["10", "1,000", "100,000", "10M"], a: 1, why: "10^8 / 10^5 שניות ≈ 1,000." },
    { q: "ב-URL shortener עם יחס קריאה/כתיבה של 100:1, איפה להשקיע?", opts: ["בכתיבות", "ב-cache ובנתיב הקריאה", "ב-Kafka", "ב-CI"], a: 1, why: "רוב התעבורה היא הפניות, ולכן cache, CDN ו-replicas." },
    { q: "מה הכי משכנע בפרויקט בתיק העבודות?", opts: ["רשימת 20 טכנולוגיות", "בעיות אמיתיות שנפתרו, עם מספרים ו-trade-offs", "אנימציות", "כמות הקוד"], a: 1, why: "זה מראה חשיבה הנדסית." }
  ],
  interview: [
    { q: "ספרי על פרויקט שבנית", a: "בעיה, ארכיטקטורה, 2-3 החלטות מעניינות עם trade-offs, בעיה קשה ואיך פתרת, ותוצאה מדידה. 2 דקות, ואחר כך המראיין יצלול." },
    { q: "איך היית מתכננת rate limiter ל-API ציבורי?", a: "דרישות (לפי משתמש או מפתח, גלובלי). אלגוריתם token bucket. מונה ב-Redis עם Lua אטומי, מיקום ב-gateway, 429 + Retry-After. התנהגות כש-Redis נופל: fail-open או fail-closed." }
  ]
}
];
